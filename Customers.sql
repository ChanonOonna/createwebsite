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
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `id` int NOT NULL,
  `firstname_customer` text NOT NULL,
  `lastname_customer` text NOT NULL,
  `type_customer` enum('บ้าน','อพาร์ทเม้น','คอนโด') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description_customer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`id`, `firstname_customer`, `lastname_customer`, `type_customer`, `description_customer`) VALUES
(1, 'aaaaaa', 'ssssssssss', 'บ้าน', 'asdas'),
(2, 'aaaa', 'ssss', 'บ้าน', 'asd'),
(5, 'asdfasd', 'fasdfasdf', 'บ้าน', 'asdfasdfasdf'),
(6, 'asdfasd', 'fasdfasdf', 'บ้าน', 'asdfasdfasdfasdfasdf'),
(7, 'sdfsadfg', 'fasdfasdf', 'บ้าน', 'asdfasdfasdfasdfasdf'),
(8, 'mbn', 'vbnm', 'บ้าน', 'vbnm'),
(9, 'asd', 'asd', 'บ้าน', 'asdasd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
