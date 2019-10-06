CREATE DATABASE  IF NOT EXISTS `Alianbot` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Alianbot`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: Alianbot
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Commands`
--

DROP TABLE IF EXISTS `Commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Commands` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號',
  `AddedBy` varchar(25) NOT NULL COMMENT '建立者',
  `KeyWord` varchar(25) NOT NULL COMMENT '關鍵字',
  `Response` varchar(45) NOT NULL COMMENT '回應',
  PRIMARY KEY (`ID`),
  KEY `AddedBy_idx` (`AddedBy`),
  CONSTRAINT `AddedBy` FOREIGN KEY (`AddedBy`) REFERENCES `members` (`UserName`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='指令																															';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commands`
--

LOCK TABLES `Commands` WRITE;
/*!40000 ALTER TABLE `Commands` DISABLE KEYS */;
/*!40000 ALTER TABLE `Commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Members` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號',
  `UserName` varchar(25) NOT NULL COMMENT '使用者名稱',
  `NickName` varchar(25) DEFAULT NULL COMMENT '暱稱',
  `PassWd` varchar(45) NOT NULL COMMENT '密碼',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UNIQUE` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='會員';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Songs`
--

DROP TABLE IF EXISTS `Songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Songs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OrdeedBy` varchar(25) DEFAULT NULL COMMENT '點播者',
  `RequestedFrom` varchar(45) NOT NULL COMMENT '來源',
  `Status` varchar(10) DEFAULT NULL COMMENT '狀態',
  PRIMARY KEY (`ID`),
  KEY `OrderedBy_idx` (`OrdeedBy`),
  CONSTRAINT `OrderedBy` FOREIGN KEY (`OrdeedBy`) REFERENCES `members` (`UserName`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='點播';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Songs`
--

LOCK TABLES `Songs` WRITE;
/*!40000 ALTER TABLE `Songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Votes`
--

DROP TABLE IF EXISTS `Votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Votes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號',
  `LaunchedBy` varchar(25) DEFAULT NULL COMMENT '發起人',
  `Topic` varchar(30) NOT NULL COMMENT '主題',
  `options` json NOT NULL COMMENT '選項',
  `Status` varchar(10) DEFAULT NULL COMMENT '狀態',
  PRIMARY KEY (`ID`),
  KEY `LaunchedBy_idx` (`LaunchedBy`),
  CONSTRAINT `LaunchedBy` FOREIGN KEY (`LaunchedBy`) REFERENCES `members` (`UserName`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Votes`
--

LOCK TABLES `Votes` WRITE;
/*!40000 ALTER TABLE `Votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-02 23:55:17
