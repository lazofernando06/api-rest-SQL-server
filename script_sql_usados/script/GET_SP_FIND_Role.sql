create PROC GET_SP_FIND_Role(
										@typeRole varchar(50)
									)
AS
set nocount on

if exists(select * from t_User where idUser=@idUser)
begin
	select *	from t_Role
	WHERE typeRole = @typeRole

end
else
begin
	print 'valor no encontrado'
	return
end

	-- exec GET_SP_SELECT_User 1