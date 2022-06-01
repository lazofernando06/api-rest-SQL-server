use UserRecord
CREATE TABLE t_Card(
	idCard int IDENTITY (1,1) NOT NULL,
	nameCard varchar(50) NOT NULL,
	numberCard varchar(50) NOT NULL,
	dateCard varchar(50) NOT NULL,
	cvcCard varchar(50) NOT NULL,
	CONSTRAINT PK_idCard PRIMARY KEY (idCard)
)