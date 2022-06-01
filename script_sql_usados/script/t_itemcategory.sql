use UserRecord
CREATE TABLE t_ItemCategory(
	idItemCategory int IDENTITY (1,1) NOT NULL,
	nameItemCategory varchar(100) NOT NULL,	
	nameCategoryItemCategory varchar(100) NOT NULL,	
	dateItemCategory datetime NOT NULL,	
	CONSTRAINT PK_idItemCategory PRIMARY KEY (idItemCategory)
)	