-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 12 月 15 日 01:37
-- 服务器版本: 5.5.8
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `phptest`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `sid` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `usename` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=209 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`sid`, `usename`, `password`) VALUES
(176, 'wangwu123', '1bbd886460827015e5d605ed44252251'),
(177, 'zhangsan1234', '1bbd886460827015e5d605ed44252251'),
(178, 'wangwu123444', '1bbd886460827015e5d605ed44252251'),
(179, 'wangwu123444', 'd41d8cd98f00b204e9800998ecf8427e'),
(180, 'wangwu123444', 'd41d8cd98f00b204e9800998ecf8427e'),
(181, 'wangwu123444', 'd41d8cd98f00b204e9800998ecf8427e'),
(182, 'wangwu123444', 'd41d8cd98f00b204e9800998ecf8427e'),
(186, 'liluhua', '25d55ad283aa400af464c76d713c07ad'),
(187, 'liluhuaLLL', 'f5bb0c8de146c67b44babbf4e6584cc0'),
(188, 'zhangsan', 'c20ad4d76fe97759aa27a0c99bff6710'),
(189, 'zhangsan', 'd41d8cd98f00b204e9800998ecf8427e'),
(193, 'GYJYLOLDSADF', 'd41d8cd98f00b204e9800998ecf8427e'),
(194, 'GYJYLOLDSADF', 'd41d8cd98f00b204e9800998ecf8427e'),
(195, 'zhangsan', 'd41d8cd98f00b204e9800998ecf8427e'),
(196, 'zhangsan', 'f5bb0c8de146c67b44babbf4e6584cc0'),
(197, 'zhangsan', '390ba5f6b5f18dd4c63d7cda170a0c74'),
(198, 'ZHANSAN', 'c0c473bee87a482f312ac656b1b6843d'),
(199, 'ZHANSAN', 'c0c473bee87a482f312ac656b1b6843d'),
(200, 'tltltl', '8ce87b8ec346ff4c80635f667d1592ae'),
(201, 'laowang', '25d55ad283aa400af464c76d713c07ad'),
(202, 'sweet', 'ed2b1f468c5f915f3f1cf75d7068baae'),
(203, 'sweet', 'ed2b1f468c5f915f3f1cf75d7068baae'),
(207, 'nihao', '8ce87b8ec346ff4c80635f667d1592ae'),
(208, 'chengyu', '25d55ad283aa400af464c76d713c07ad');
