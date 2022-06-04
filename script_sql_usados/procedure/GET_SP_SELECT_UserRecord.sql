ALTER PROC GET_SP_SELECT_UserRecord

AS
set nocount on


if exists(select * from t_User)
begin

	select idUser,nameUser,lastnameUser,emailUser,passwordUser,
	(select r.typeRole from t_Role R where	r.idRole=u.idRole) roleUser,
	(select s.nameStatus from t_Status S where s.idStatus=u.idStatus) statusUser,
	(select g.statusGoogle from t_Google G where g.idGoogle=u.idGoogle) googleUser
	from t_User U
	where idStatus=1
end

-- exec GET_SP_SELECT_UserRecord