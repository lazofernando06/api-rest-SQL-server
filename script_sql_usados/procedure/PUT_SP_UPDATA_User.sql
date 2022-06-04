alter PROC PUT_SP_UPDATA_User(
										@idUser int ,
										@nameUser varchar(50),
										@lastmaneUser varchar(50),
										@passwordUser varchar(50),
										@imgUser varchar(80),
										@roleUser varchar(80),
										@statusUser varchar(80),
										@googleUser varchar(80)
									)
AS
set nocount on

if exists(select * from t_User where idUser = @idUser)
begin
	DECLARE		@typeRole INT,
					 @nameStatus INT,
					@statusGoogle INT

	SET @typeRole = (select idRole from t_Role where	typeRole = @roleUser)
	SET @nameStatus = (select idStatus	from t_Status where	nameStatus = @statusUser)
	SET @statusGoogle = (select idGoogle from t_Google where	statusGoogle = @googleUser)


	UPDATE t_User SET nameUser =@nameUser,
										lastnameUser=@lastmaneUser,
										passwordUser=@passwordUser,
										imgUser=@imgUser,
										idRole=@typeRole,
										idStatus=@nameStatus,
										idGoogle=@statusGoogle
	WHERE idUser = @idUser

	exec GET_SP_SELECT_User @idUser

	print @typeRole
	print @nameStatus
	print @statusGoogle
end

--exec PUT_SP_UPDATA_User 25,'namePrueba7','lastnamePrueba7','111111111','esds','USER_ROLE','ACTIVE','NO ENABLE'

/*
	 SELECT * FROM t_Role
   SELECT * FROM t_Status
   SELECT * FROM t_Google
	 */