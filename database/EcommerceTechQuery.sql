-- 
-- Create database `EcommerceTech`
-- 
CREATE DATABASE IF NOT EXISTS EcommerceTech;
USE EcommerceTech;

-- 
-- Create table `users`
-- 
CREATE TABLE `ecommercetech`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`));