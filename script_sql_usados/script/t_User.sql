use UserRecord
CREATE TABLE t_User(
	idUser int	IDENTITY (1,1) NOT NULL,
	nameUser varchar(50) NOT NULL,
	lastnameUser varchar(50) NOT NULL,
	emailUser varchar(50) NOT NULL,
	passwordUser varchar(50) NOT NULL,
	imgUser varchar(80) NULL,
	idRole int NOT NULL,
	idStatus int NOT NULL,
	idGoogle int NOT NULL,
	CONSTRAINT PK_idUser PRIMARY KEY (idUser)
)