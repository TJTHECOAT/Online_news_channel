CREATE DATABASE campus_connect;

USE campus_connect;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  matric_no VARCHAR(50),
  password VARCHAR(255),
  role ENUM('student', 'admin') DEFAULT 'student'
);

-- Example admin account
INSERT INTO users (name, matric_no, password, role)
VALUES ('AdminUser', 'admin123', 'adminpass', 'admin');
