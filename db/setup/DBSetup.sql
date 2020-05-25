CREATE TABLE `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `todo` (
  `idTodo` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `category` varchar(45) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idTodo`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;


