/*
  # Create initial schema for Uptime Monitor

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    - `monitors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `name` (text)
      - `url` (text)
      - `type` (text)
      - `interval` (integer)
      - `port` (integer, optional)
      - `keyword` (text, optional)
      - `expected_status_code` (integer, optional)
      - `created_at` (timestamp)
      - `last_check` (timestamp, optional)
      - `status` (text)
      - `uptime_percentage` (numeric)
      - `response_time` (integer)
    - `monitor_checks`
      - `id` (uuid, primary key)
      - `monitor_id` (uuid, foreign key to monitors)
      - `status` (text)
      - `response_time` (integer)
      - `error` (text, optional)
      - `created_at` (timestamp)
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `name` (text)
      - `type` (text)
      - `config` (jsonb)
      - `enabled` (boolean)
      - `created_at` (timestamp)
    - `incidents`
      - `id` (uuid, primary key)
      - `monitor_id` (uuid, foreign key to monitors)
      - `title` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `resolved_at` (timestamp, optional)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create monitors table
CREATE TABLE IF NOT EXISTS monitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('http', 'ping', 'tcp', 'keyword')),
  interval integer NOT NULL DEFAULT 60,
  port integer,
  keyword text,
  expected_status_code integer,
  created_at timestamptz DEFAULT now(),
  last_check timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('up', 'down', 'pending')),
  uptime_percentage numeric NOT NULL DEFAULT 100,
  response_time integer NOT NULL DEFAULT 0
);

-- Create monitor_checks table
CREATE TABLE IF NOT EXISTS monitor_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  monitor_id uuid REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL CHECK (status IN ('up', 'down')),
  response_time integer NOT NULL,
  error text,
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'webhook', 'slack', 'discord')),
  config jsonb NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  monitor_id uuid REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  status text NOT NULL CHECK (status IN ('investigating', 'identified', 'monitoring', 'resolved')),
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for monitors
CREATE POLICY "Users can read own monitors"
  ON monitors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own monitors"
  ON monitors
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own monitors"
  ON monitors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own monitors"
  ON monitors
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for monitor_checks
CREATE POLICY "Users can read own monitor checks"
  ON monitor_checks
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM monitors
    WHERE monitors.id = monitor_checks.monitor_id
    AND monitors.user_id = auth.uid()
  ));

-- Create policies for notifications
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for incidents
CREATE POLICY "Users can read own incidents"
  ON incidents
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM monitors
    WHERE monitors.id = incidents.monitor_id
    AND monitors.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own incidents"
  ON incidents
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM monitors
    WHERE monitors.id = incidents.monitor_id
    AND monitors.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own incidents"
  ON incidents
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM monitors
    WHERE monitors.id = incidents.monitor_id
    AND monitors.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own incidents"
  ON incidents
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM monitors
    WHERE monitors.id = incidents.monitor_id
    AND monitors.user_id = auth.uid()
  ));