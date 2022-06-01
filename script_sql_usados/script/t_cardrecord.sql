use UserRecord
CREATE TABLE t_CardRecord(
	idUser int  NOT NULL,
	idCard int  NOT NULL,
	PRIMARY KEY (idUser,idCard)
)