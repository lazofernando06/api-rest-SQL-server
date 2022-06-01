use UserRecord
CREATE TABLE t_CommentRecord(
	idUser int NOT NULL,
	idPostComment int NOT NULL,
	PRIMARY KEY (idUser,idPostComment)
)