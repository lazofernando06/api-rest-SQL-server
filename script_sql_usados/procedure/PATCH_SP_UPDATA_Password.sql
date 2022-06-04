alter PROC PATCH_SP_UPDATA_Password(
										@idUser int,
										@passwordUser varchar(100) 
									)
AS
set nocount on

if exists(select * from t_User where idUser=@idUser)
begin

	DECLARE		@oldPassword varchar(100) 
	SET @oldPassword = (select passwordUser from t_User where idUser=@idUser)

	if @oldPassword <>@passwordUser
	begin

		UPDATE t_User SET passwordUser=@passwordUser
		WHERE idUser = @idUser
		exec GET_SP_SELECT_User @idUser
		
	end
	else
	begin
		--select 0 as resultado
		print 'la contraseña no ha sido cambiada'
	return
end
end


	-- exec PATCH_SP_UPDATA_Password 1,'123456789'