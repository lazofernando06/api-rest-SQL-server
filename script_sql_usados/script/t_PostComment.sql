use UserRecord
CREATE TABLE t_PostComment(
	idPostComment int IDENTITY (1,1) NOT NULL,
	imagePostComment varchar(100) NULL,	
	commentPostComment varchar(100) NULL,	
	scorePostComment int NOT NULL,
	CONSTRAINT PK_idPostComment PRIMARY KEY (idPostComment)
)	