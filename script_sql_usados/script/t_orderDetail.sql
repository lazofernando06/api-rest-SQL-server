use UserRecord
CREATE TABLE t_OrderDetail(
	idOrderDetail int	IDENTITY (1,1) NOT NULL,
	nameOrderDetail int NOT NULL,
	priceOrderDetail money NOT NULL,
	amountOrderDetail int NOT NULL,
	numbePeoplePayment int NOT NULL,
	ticketPeoplePayment int NOT NULL,
	datePayment int NOT NULL,
	statusPayment bit NOT NULL,
	CONSTRAINT PK_idOrderDetail PRIMARY KEY (idOrderDetail)
)
