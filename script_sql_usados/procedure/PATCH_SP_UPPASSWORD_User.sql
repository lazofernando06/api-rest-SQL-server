alter PROC PATCH_SP_UPPASSWORD_User(
										@idUser int ,
										@newpassword varchar(80)
									)
AS
set nocount on

if exists(select * from t_User where idUser = @idUser and idStatus=1)
begin

	UPDATE t_User SET passwordUser = @newpassword
	WHERE idUser = @idUser
	print 'contraseņa actualizada'
	
end

--exec PUT_SP_UPPASSWORD_User 1,'654321'
/*
   SELECT * FROM t_Status
   SELECT * FROM t_Google
	 */
	 