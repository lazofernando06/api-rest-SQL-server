alter PROC GET_SP_SELECT_Email(
										@emailUser varchar(100) 
									)
AS
set nocount on

if exists(select * from t_User where emailUser=@emailUser and idStatus=1)
begin
	select idUser,nameUser,lastnameUser,emailUser,passwordUser,
	(select r.typeRole from t_Role R where	r.idRole=u.idRole) roleUser,
	(select s.nameStatus from t_Status S where s.idStatus=u.idStatus) statusUser,
	(select g.statusGoogle from t_Google G where g.idGoogle=u.idGoogle) googleUser
	from t_User U	
	WHERE emailUser = @emailUser
end
else
begin
	--select 0 as resultado
	print 'El correo ya se encuentra registrado'
	return
end

	-- exec GET_SP_SELECT_Email 'dos@dos.com'