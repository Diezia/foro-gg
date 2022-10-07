-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: forogg_database
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(300) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL,
  `post_id` int NOT NULL,
  `created_by_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (104,'Great post!','2022-10-07 16:38:03',22,76,'Santi'),(105,'Great info!','2022-10-07 16:38:23',22,77,'Santi'),(107,'Gracias por leer\n','2022-10-07 16:46:10',23,81,'manuel'),(108,'Vayan a darle a me gusta','2022-10-07 16:47:59',23,82,'manuel'),(109,'Buen post','2022-10-07 16:55:43',20,76,'yael'),(110,'Bue post manu ','2022-10-07 16:56:05',20,81,'yael'),(111,'Buen post guido!','2022-10-07 17:05:49',20,77,'yael'),(112,'El número 160 es mejor','2022-10-07 17:11:51',20,78,'yael'),(114,'Ahí tiene su me gusta','2022-10-07 17:35:23',25,76,'user-grupo-grins');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Valorant','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876853/miracle/valorant_ormzyn.png'),(2,'League of Legends','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876853/miracle/lol_g70caz.png'),(3,'Dota','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876852/miracle/dota_os9iqs.png'),(4,'Among Us','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876852/miracle/amongus_tb27gx.png'),(5,'Minecraft','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876850/miracle/minecraft_qalwww.png'),(6,'Counter Strike GO','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876851/miracle/csgo_e02zdj.png'),(7,'Rocket League','https://res.cloudinary.com/dl81r5ftx/image/upload/v1663876850/miracle/rocket_n6c2hs.png'),(8,'GTA V','https://res.cloudinary.com/dl81r5ftx/image/upload/v1664382600/miracle/gtav_hptql0.png');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `valoration` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL,
  `game_id` int NOT NULL,
  `created_by_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (75,'LoL - Parche 12.19: El rework de Syndra llega acompañado de los dos \'nerfs\' más esperados','<p>Todos los jugadores de <strong>League of Legends</strong> podrán disfrutar del Parche 12.20. Una nueva actualización que incluye cambios a más de 20 campeones entre los que destacan el rework de <em>Syndra</em> y las reducciones de poder que sufrirán Maestro Yi y Rek’Sai.&nbsp;</p>\n<p>League of Legends se ha librado de los jugadores profesionales durante algún tiempo. Aunque estamos en plena celebración de los <ins>Worlds 2022</ins>, el campeonato mundial se disputará de forma íntegra en la Versión 12.18 y tras la finalización del torneo los profesionales no volverán a jugar torneos relevantes hasta que comience la Temporada 13. Un periodo de unas seis actualizaciones que ofrece a Riot Games grandes libertades para hacer ajustes que han postergado por miedo a desestabilizar el entorno de élite y que comienza con la introducción del Parche 12.19 disponible desde la madrugada del 5 de octubre hasta la del próximo día 20.</p>\n<p>na de las medidas estrella del <ins>Parche 12.19</ins> será<em> la actualización jugable que recibirá Syndra</em>. Lo cierto es que Riot Games se ha puesto creativa con la vieja campeona, cambiando de algún modo el efecto de todas sus habilidades y añadiéndole una pasiva que le permitirá ganar poder conforme gana la partida. Sus hechizos nos serán familiares a todos los jugadores al lanzarse de un modo idéntico, pero muchos añadidos en sus efectos le darán un sabor refrescante que, además, se une a los recientes cambios visuales para dejarla lista de cara a los próximos años de <strong>League of Legends</strong>.</p>\n<p></p>\n',0,'2022-10-07 16:29:42',NULL,20,2,'yael'),(76,'Climbing & Ranking Up Megathread','<p>Welcome to the \"<strong><ins>Climbing &amp; Ranking Up</ins></strong>\" Discussion Megathread, where you, the community, get to ask your questions and share your knowledge on climbing and improving in competitive play.</p>\n<p>--</p>\n<p>Not sure which part of your gameplay <em>needs improvement</em>? Share a video, or share your profile!</p>\n<p>Looking for some resources or streamers to help get started on your improvement journey? Ask or share away!</p>\n<p>This thread is a place for players to ask questions and get help or advice from more experienced players. So, don\'t hold back, get your competitive related questions ready and post away!</p>\n<p>&nbsp;- Including a video or a player profile may make it easier for people to provide helpful or tailored advice.</p>\n<p>&nbsp;- This is not a rant thread to complain about your teammates or the MMR system. Unhelpful comments of this nature may be removed to prevent the Megathread from drifting off-topic. This thread is for players seeking help from each other in order to improve at the game.</p>\n',0,'2022-10-07 16:33:38',NULL,21,1,'guido'),(77,'Counter-Strike: Global Offensive update for 9/30/22','<p>SteamDB has spotted a<ins> small update</ins> for the game: <strong><ins>https://steamdb.info/app/730/history/</ins></strong></p>\n<p>Size is a bit<em> over 10 MB</em>. Although unlikely, more info will be edited in if it does become available.</p>\n<p>&nbsp;- There\'s not much in this one, you\'ll be able to watch the Road to Rio in-game, some code optimization for the friends list in-game (speculated to possibly seal off a reflection attack vector suffered by ESL earlier in the week), and a fair bit of new and updated translations made possible with the efforts of Translators Like You - <strong>Thank You</strong></p>\n',0,'2022-10-07 16:35:10',NULL,21,6,'guido'),(78,'Minecraft Bi-Weekly Build Challenge #159 : Spaceship','<p>Gold</p>\n<p></p>\n<p><strong><ins>Hypropeteus</ins></strong></p>\n<p>Well this certainly conveys a sense of dread when looking at the image. The dark dark trees and the colour palette are perfect in this build. You managed to really represent the aftermath of a fire and still maintain shape and texture in your builds (so much that I can somewhat guess what they would have looked like before!)</p>\n<p><strong><ins>MCJAMSessions</ins></strong></p>\n<p>You know skulk in the most destructive block in the game, when you think about it. And if left unchecked and underneath, say, a mob farm, could be an incredible disaster for your worlds. I think you did a good job representing this and I liked (morbidly) seeing the skulk take over the town.</p>\n<p><em>Good job!!</em></p>\n<p><strong>Bronze</strong></p>\n<p><ins>BankMindless1714</ins></p>\n<p>A very solid bunker build, and interested in the siren which could be heard! However we felt this was more for disaster prep than the aftermath of one. So while it was solidly built, we felt it didn\'t represent the theme as well as the other builds.</p>\n<p><em>Great bunker however!</em></p>\n',0,'2022-10-07 16:37:46',NULL,22,5,'Santi'),(79,'Minecraft: Estos son los tres mobs que se disputan tu amor de cara a la próxima actualización','<p>Minecraft presentó el Sniffer, el Rascal y el Tuff Golem, los tres nuevos mobs de los cuales vos elegís el que llegará con la próxima actualización del juego.</p>\n<p>Finalmente conocimos los tres mobs que se disputarán un lugar para estar en la versión 1.20 de Minecraft el próximo año. Como en cada edición, Mojang les da a los jugadores la posibilidad de elegir entre tres criaturas diferentes para que lleguen al juego. La votación será el próximo 14 de octubre en el juego, y tendremos <em>24 horas</em> para votar en caso de no estar seguros. A continuación te mostramos los tres mobs para que sepas a quien votar.</p>\n<p><strong>Sniffer</strong></p>\n<p>El primero que presentaron fue el Sniffer, esta es una criatura antigua y extinta de la cual podremos conseguir sus huevos en el océano. Este mob nos ayudará a conseguir semillas extintas y poder cultivarlas. Si queres saber más acerca del <ins>Sniffer</ins>, <em>en esta nota te contamos todo</em>.</p>\n<p><strong>Rascal</strong></p>\n<p>Ya en el segundo día conocimos al Rascal, y lo cierto es que la recepción general fue bastante dividida. El Rascal es un mob que podremos encontrar en las cuevas y nos traerá una mecánica muy entretenida: el <ins>Hide and Seek</ins>. Una vez que el Rascal nos vea, va a huir de nosotros, así hasta que lo encontremos tres veces. Una vez que lo encontremos por tercera vez, esta criatura nos regalara un ítem, que en el video es un pico de hierro encantado.</p>\n<p></p>\n',0,'2022-10-07 16:42:09',NULL,23,5,'manuel'),(80,'Riot planea cambios inminentes sobre el Escurridizo de LoL','<p><strong>Riot Games</strong> se sigue preparando para el inicio de la Pretemporada 2023 de League of Legends. Durante los últimos días nos han presentado un montón de actualizaciones en lo que a objetos, comunicación y la jungla respecta. Y parece que seguiremos viendo más cambios en este último aspecto. Según se ha revelado en redes, parece que el Escurridizo de la <em><ins>Grieta de LoL</ins></em>, ese «cangrejo» que aparece tanto en la zona superior como inferior del río, volvería a ser objeto de modificaciones.</p>\n<p>Desde que llegó al <em>MOBA </em>allá por la Season 4, el Escurridizo de la Grieta ha estado sujeto a múltiples cambios. El último llegó durante la Temporada 11. En esa ocasión añadieron un escudo a este monstruo que podía ser eliminado instantáneamente con el Smite o con cualquier habilidad que infligiera algún tipo de <em>CC</em>. Algo que próximamente dejará de existir en el videojuego.</p>\n<p><strong><ins>El Escurridizo de la Grieta de LoL recibirá nuevos cambios</ins></strong></p>\n<p>El encargado de revelar esta actualización ha sido Spideraxe. Según confirmó, este monstruo neutral será nerfeado y los cambios ya están en el <ins>PBE</ins>. Por lo pronto estos serían los únicos cambios que se aplicarían sobre el Escurridizo de la Grieta. Esto quiere decir que los junglas seguirán buscando hacerse con él para dejar por detrás a su rival dentro de la partida.</p>\n<p></p>\n',0,'2022-10-07 16:44:29',NULL,23,2,'manuel'),(81,'KOI y Rogue confirman su participación en la LEC 2023','<p>En un comunicado lanzado desde Nueva York, Rogue ha confirmado que KOI participará en la a partir de LEC 2023 gracias a un acuerdo llegado con ellos.</p>\n<p>Con la llegada de la fase de grupos de Worlds 2022 a Nueva York y la participación de Rogue como equipo en el grupo C, Rogue ha confirmado desde la gran manzana un secreto a voces.</p>\n<p>El club ha anunciado, antes de tiempo, el acuerdo llegado entre ambos clubes se unen para realizar grandes proyectos en el futuro.</p>\n<p><strong><ins>KOI llega a la LEC en 2023</ins></strong></p>\n<p>Si bien no se conoce el nombre del club que participará en la LEC, Rogue y KOI han llegado a un acuerdo mediante el cual ambos se unen para “construir un legado global en los esports, entretenimiento y el metaverso”.</p>\n<p>Como se menciona en el comunciado, <em>“La formidable alianza estratégica arranca a principios de 2023 y verá cómo las organizaciones combinan sus fuerzas para dominar los deportes electrónicos en Europa. Juntos, Rogue y KOI aprovecharán la experiencia de Infinite Reality para desarrollar experiencias metaversas muy atractivas en el espacio de los deportes electrónicos y más allá para ofrecer las mejores experiencias a los aficionados. Los fans de todo el mundo podrán conectarse con Ibai y Gerard Piqué en sus propios entornos metaversos, así como disfrutar de impresionantes contenidos originales, eventos en directo, activaciones de marca exclusivas, productos digitales y en vivo, y mucho más.”</em></p>\n',0,'2022-10-07 16:45:49',NULL,23,2,'manuel'),(82,'Valorant imita a CS:GO y añade un easter egg a un mapa para recordar el ace de crashies','<p><ins>Riot Games</ins> sigue los pasos de <ins>Valve</ins> y opta por añadir guiños de jugadas emblemáticas de sus torneos en diversos mapas del shooter, comenzando por uno en Fracture.</p>\n<p><em>Los shooters competitivos suelen dejarnos con momentos de ensueño en sus mejores campeonatos, con jugadas épicas que pasan a formar parte de la historia del juego y, en ocasiones, incluso se integran de alguna forma en el propio título.</em></p>\n<p>De hecho Valve comenzó a añadir grafitis en ciertos mapas de CS:GO para rendir homenaje a grandes jugadas como la doble kill de S1mple en Cache y ahora Riot Games quiere seguir sus pasos añadiendo pequeños huevos de pascua o guiños en sus mapas relacionados con grandes momentos en sus torneos.</p>\n<p>Sin ir más lejos la actualización de Fracture llega con varios cambios en el mapa entre los que se encuentra un guiño muy especial en la zona de aparición de los defensores, en la que podemos encontrar una pequeña pantalla e interactuar con ella para leer un email que hace referencia a un ace que se produjo en las finales del VTC 2022.</p>\n<p><strong>Una jugada para el recuerdo</strong></p>\n<p>La jugada a la que se refiere este guiño es un ace de crashies, el jugador de OpTic Gaming que destrozó a todo el equipo de Boom que intentó utilizar las tirolinas para pasar rápidamente de un lado al otro del mapa... <em>con un trágico desenlace para ellos dando lugar a una de las jugadas más épicas de esta gran final:</em></p>\n<p></p>\n',0,'2022-10-07 16:47:46',NULL,23,1,'manuel');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'yael','diezyael@gmail.com',NULL,'$2b$10$BHHljs2.q9I58CKlIDM6a.M2K04IaSFsbl9NJ1zxJ00t4XhzS9VfC'),(21,'guido','guido@gmail.com',NULL,'$2b$10$60pDNxIB2XofT9DXeXDhbuPMIaTahtE3Puk8Gsal0fZgxzTD6sq7C'),(22,'Santi','santi@gmail.com',NULL,'$2b$10$JmZFlsodnhluh1Gqpf1Nuuy7bFOnMjUaqhk3GgUSR8mXMGW9z5dKu'),(23,'manuel','manu@gmail.com',NULL,'$2b$10$lzyDK5CKbE1OHaq.hgtcQeU4wCF8.Kbh3uzQcvwBGmknfZtn05Edm'),(24,'nombre','nombre@gmail.com',NULL,'$2b$10$FSDatHAiDNjqzM25ptZmuuO7SNcsY7OJ1R8KBcovLMLxMA9PXRtOG'),(25,'user-grupo-grins','usergrupogris@gmail.com',NULL,'$2b$10$0CXc.yYenMR7LZe1DfwI8uITk9jPjNMUESTTkHrw3/XExL2VThvzq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valorations`
--

DROP TABLE IF EXISTS `valorations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valorations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `valorations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `valorations_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valorations`
--

LOCK TABLES `valorations` WRITE;
/*!40000 ALTER TABLE `valorations` DISABLE KEYS */;
INSERT INTO `valorations` VALUES (62,20,75),(64,21,77),(65,22,76),(67,22,77),(69,23,81),(70,23,80),(71,23,75),(72,20,76),(74,20,81),(75,20,78),(77,25,76),(79,25,82);
/*!40000 ALTER TABLE `valorations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 14:49:20
