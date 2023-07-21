-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2023 at 07:50 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fight_2d`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `selectall` (IN `name` VARCHAR(104), IN `pass` VARCHAR(104))   BEGIN
	SELECT p_username FROM player_details WHERE p_username = name AND p_password = pass;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `gamesession`
--

CREATE TABLE `gamesession` (
  `gameId` int(11) NOT NULL,
  `player1` varchar(104) DEFAULT NULL,
  `player2` varchar(104) DEFAULT NULL,
  `winner` varchar(104) DEFAULT NULL,
  `loser` varchar(104) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gamesession`
--


--
-- Triggers `gamesession`
--
DELIMITER $$
CREATE TRIGGER `update_player_statistics` AFTER INSERT ON `gamesession` FOR EACH ROW BEGIN
   
    UPDATE player_stats
    SET matchplayed = matchplayed + 1
    WHERE p_username = NEW.player1 OR p_username = NEW.player2;
    
    
    IF NEW.winner IS NOT NULL THEN
        UPDATE player_stats
        SET matchWon = matchWon + 1
        WHERE p_username = NEW.winner;
        
        UPDATE player_stats
        SET matchLost = matchLost + 1
        WHERE p_username = NEW.loser;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `player_details`
--

CREATE TABLE `player_details` (
  `p_username` varchar(104) NOT NULL,
  `p_email` varchar(104) DEFAULT NULL,
  `p_password` varchar(144) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_details`
--


--
-- Triggers `player_details`
--
DELIMITER $$
CREATE TRIGGER `insertintoStats` AFTER INSERT ON `player_details` FOR EACH ROW BEGIN
INSERT INTO player_stats(p_username) VALUES (NEW.p_username);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `player_stats`
--

CREATE TABLE `player_stats` (
  `p_username` varchar(104) NOT NULL,
  `matchPlayed` int(11) DEFAULT 0,
  `matchWon` int(11) DEFAULT 0,
  `matchLost` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_stats`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `gamesession`
--
ALTER TABLE `gamesession`
  ADD PRIMARY KEY (`gameId`);

--
-- Indexes for table `player_details`
--
ALTER TABLE `player_details`
  ADD PRIMARY KEY (`p_username`);

--
-- Indexes for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD PRIMARY KEY (`p_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gamesession`
--
ALTER TABLE `gamesession`
  MODIFY `gameId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD CONSTRAINT `player_stats_ibfk_1` FOREIGN KEY (`p_username`) REFERENCES `player_details` (`p_username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
