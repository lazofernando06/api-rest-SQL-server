alter PROC DELETE_SP_UPDATA_RecordUser(
																				@idUser int
																			)
AS
set nocount on

if exists(select * from t_User where idUser=@idUser and idStatus=1)
begin
	exec GET_SP_SELECT_User @idUser
	UPDATE t_User SET idStatus =2
	WHERE idUser = @idUser
	
end
else
begin
	--select 0 as resultado
	print 'No se pudo revisar la cuenta'
	return
end

	-- exec DELETE_SP_UPDATA_RecordUser 3001