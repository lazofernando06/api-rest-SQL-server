alter PROC GET_SP_SELECT_User(
										@idUser int
									)
AS
set nocount on

if exists(select * from t_User where idUser=@idUser and idStatus=1)
begin
	select idUser as 'id',nameUser as 'name',lastnameUser as 'lastname',emailUser as 'email',passwordUser as 'password',imgUser as 'img',
	(select r.typeRole from t_Role R where	r.idRole=u.idRole) 'role',
	(select s.nameStatus from t_Status S where s.idStatus=u.idStatus) 'status',
	(select g.statusGoogle from t_Google G where g.idGoogle=u.idGoogle) google
	from t_User U

	WHERE idUser = @idUser

end
else
begin
	--select 0 as resultado
	print 'obtener usuario por id'
	return
end

	-- exec GET_SP_SELECT_User 1