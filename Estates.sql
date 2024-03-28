-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 28, 2024 at 08:23 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Estates`
--

CREATE TABLE `Estates` (
  `id` int NOT NULL,
  `name_Estate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address_Estate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type_Estate` enum('บ้าน','อพาร์ทเม้น','คอนโด') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size_Estate` float NOT NULL,
  `description_Estate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status_estate` enum('พร้อมใช้งาน','ไม่พร้อมใช้งาน','อยู่ระหว่างการซ่อมบำรุง','ถูกจองแล้ว') CHARACTER SET utf8mb4 COLLATE utf8mb4_bs_0900_ai_ci NOT NULL,
  `maintenance_report` text NOT NULL,
  `maintenance_expense` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Estates`
--

INSERT INTO `Estates` (`id`, `name_Estate`, `address_Estate`, `type_Estate`, `size_Estate`, `description_Estate`, `status_estate`, `maintenance_report`, `maintenance_expense`) VALUES
(1, 'ไทยบ้าน', '56/3 กทม', 'บ้าน', 12.5, 'ประคูแดง', 'พร้อมใช้งาน', '0', ''),
(2, 'sdf', 'sdfsdf', 'บ้าน', 123, 'asdas', 'พร้อมใช้งาน', '0', '3'),
(4, 'asd', 'asd', 'อพาร์ทเม้น', 12, 'fgfhdfg', 'พร้อมใช้งาน', '0', ''),
(5, 'บ้านนี้', 'มีรัก', 'อพาร์ทเม้น', 123, 'asdasd', 'พร้อมใช้งาน', '0', ''),
(8, 'asd', 'asd', 'บ้าน', 11111100000, 'asdasd', 'พร้อมใช้งาน', '0', ''),
(9, 'ฟหก', 'ฟหก', 'คอนโด', 1222230000, 'asdasdfsdf', 'พร้อมใช้งาน', '0', ''),
(15, 'ผแอป', 'ผปแอ', 'อพาร์ทเม้น', 11, 'sdf', 'ไม่พร้อมใช้งาน', '0', ''),
(17, 'asd', 'asd', 'อพาร์ทเม้น', 12, 'asda', 'อยู่ระหว่างการซ่อมบำรุง', '0', ''),
(18, 'asd', 'asdasd', 'อพาร์ทเม้น', 12, 'asdasd', 'พร้อมใช้งาน', '0', ''),
(19, 'asdas', 'asdasd', 'อพาร์ทเม้น', 12, 'asdas', 'พร้อมใช้งาน', 'asd', '12'),
(20, 'asd', 'asd', 'บ้าน', 23, 'fdfgdfg', 'พร้อมใช้งาน', '345', '5678567'),
(21, 'asd', 'asdasd', 'คอนโด', 12, 'asdasd', 'พร้อมใช้งาน', '12', '56'),
(23, 'asd', 'asd', 'อพาร์ทเม้น', 1, 'ฟหก', 'พร้อมใช้งาน', 'ฟหกฟห', '213'),
(24, 'asd', 'asd', 'อพาร์ทเม้น', 34, 'gfdhdfbdfg', 'ถูกจองแล้ว', 'asdsdfgh', '34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Estates`
--
ALTER TABLE `Estates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Estates`
--
ALTER TABLE `Estates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
