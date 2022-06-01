use UserRecord
CREATE TABLE t_Role(
	idRole int	IDENTITY (1,1) NOT NULL,
	typeRole varchar(50) NOT NULL,
	CONSTRAINT PK_idRole PRIMARY KEY (idRole)
)