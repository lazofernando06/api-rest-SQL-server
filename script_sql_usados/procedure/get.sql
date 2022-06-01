select nameUser,lastnameUser,emal from t_User U
INNER JOIN t_Role T
ON T.idRole = U.idRole


select * from t_User U
LEFT JOIN t_Role R
ON R.idRole = U.idRole
LEFT JOIN t_Status S
ON S.idStatus = U.idStatus
LEFT JOIN t_Google G
ON G.idGoogle = U.idGoogle


select U.nameUser,U.lastnameUser,U.emailUser,U.passwordUser,
				R.typeRole,S.nameStatus,G.estaodGoogle FROM t_User U
INNER JOIN t_Role R
ON R.idRole = U.idRole
INNER JOIN t_Status S
ON S.idStatus = U.idStatus
INNER JOIN t_Google G
ON G.idGoogle = U.idGoogle


select * from t_User
select * from t_Role
select * from t_Status
select * from t_Google