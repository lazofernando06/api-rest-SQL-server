alter PROC GET_SP_SELECT_User(
										@idUser int
									)
AS
set nocount on

if exists(select * from t_User where idUser=@idUser)
begin
	select idUser,nameUser,lastnameUser,emailUser,passwordUser,
	(select r.typeRole from t_Role R where	r.idRole=u.idRole) roleUser,
	(select s.nameStatus from t_Status S where s.idStatus=u.idStatus) statusUser,
	(select g.statusGoogle from t_Google G where g.idGoogle=u.idGoogle) googleUser
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