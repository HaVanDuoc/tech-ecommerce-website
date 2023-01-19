-- 
-- Create database `EcommerceTech`
-- 
CREATE DATABASE IF NOT EXISTS EcommerceTech;
USE EcommerceTech;

-- 
-- Create table `user`
-- 
CREATE TABLE `ecommercetech`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NULL,
  `phone_number` INT(11) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`));
  
-- 
-- Create table `account`
-- 
  CREATE TABLE `ecommercetech`.`account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `account_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_account_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `ecommercetech`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

-- CREATE TABLE `ecommercetech`.`test`(`id` INT NOT NULL AUTO_INCREMENT, `test` VARCHAR(255) NULL, PRIMARY KEY (`id`))
-- alter table ecommercetech.users add phone_number INT(11) null after email
-- alter table ecommercetech.users drop column phone_number
-- alter table ecommercetech.users rename to ecommercetech.user

-- Fix Bug
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MS.1810duoc2000'; (https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
