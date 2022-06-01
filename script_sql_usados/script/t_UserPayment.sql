use UserRecord
CREATE TABLE t_UserPayment(
	idUser int NOT NULL,
	idOrderDetail int NOT NULL,
	PRIMARY KEY(idUser,idOrderDetail)
)