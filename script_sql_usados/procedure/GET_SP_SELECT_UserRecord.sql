alter PROC GET_SP_SELECT_UserRecord

AS
set nocount on


if exists(select * from t_User)
begin

	select idUser as id,nameUser as 'name',lastnameUser as 'lastname',emailUser as 'email',passwordUser as 'password',
	(select r.typeRole from t_Role R where	r.idRole=u.idRole) 'role',
	(select s.nameStatus from t_Status S where s.idStatus=u.idStatus) 'status',
	(select g.statusGoogle from t_Google G where g.idGoogle=u.idGoogle) google
	from t_User U
	where idStatus=1
end

-- exec GET_SP_SELECT_UserRecord
-- select * from t_Role 
-- select * from t_Status 
-- select * from t_Google 
-- select * from t_User 