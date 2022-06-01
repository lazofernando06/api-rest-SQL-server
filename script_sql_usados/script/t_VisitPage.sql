use UserRecord
CREATE TABLE t_VisitPage(
	idUser int NOT NULL,
	idItemCategory int NOT NULL,	
	PRIMARY KEY(idUser,idItemCategory)
)