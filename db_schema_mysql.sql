-- MySQL Script for MySQL Workbench
-- Цей файл відображає структуру, реалізовану в Prisma

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT NOT NULL,
  `serialNumber` VARCHAR(255) NOT NULL,
  `isNew` TINYINT(1) NOT NULL DEFAULT 1,
  `photo` VARCHAR(255) NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `specification` VARCHAR(255) NOT NULL,
  `guaranteeStart` DATETIME NOT NULL,
  `guaranteeEnd` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_orderId` (`orderId` ASC),
  CONSTRAINT `fk_product_order`
    FOREIGN KEY (`orderId`)
    REFERENCES `Order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Price` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `value` DOUBLE NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `isDefault` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `idx_productId` (`productId` ASC),
  CONSTRAINT `fk_price_product`
    FOREIGN KEY (`productId`)
    REFERENCES `Product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;