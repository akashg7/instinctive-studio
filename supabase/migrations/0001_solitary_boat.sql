/*
  # Initial Schema Setup

  1. New Tables
    - students
      - id (uuid, primary key)
      - name (text)
      - cohort (text)
      - date_joined (timestamptz)
      - last_login (timestamptz)
      - status (text)
    - courses
      - id (uuid, primary key)
      - name (text)
      - icon (text)
    - student_courses
      - id (uuid, primary key)
      - student_id (uuid, foreign key)
      - course_id (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  date_joined timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  status text DEFAULT 'active'
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL
);

-- Create junction table for students and courses
CREATE TABLE IF NOT EXISTS student_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_id)
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to authenticated users" ON students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON courses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON student_courses
  FOR SELECT TO authenticated USING (true);