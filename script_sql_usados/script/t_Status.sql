use UserRecord
CREATE TABLE t_Status(
	idStatus int	IDENTITY (1,1) NOT NULL,
	nameStatus varchar(50)NOT NULL,
	CONSTRAINT PK_idStatus PRIMARY KEY (idStatus)
)