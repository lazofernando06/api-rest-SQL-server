alter PROC POST_SP_INSERT_User(
										@nameUser varchar(50)='',
										@lastmaneUser varchar(50),
										@emailUser varchar(50),
										@passwordUser varchar(50),
										@imgUser varchar(80)='',
										@roleUser varchar(50),
										@statusUser varchar(50),
										@googleUser varchar(50)
									)
AS
set nocount on

if not exists(select * from t_User where emailUser=@emailUser)
begin

	DECLARE		@typeRole INT,
					 @nameStatus INT,
					@statusGoogle INT

	SET @typeRole = (select idRole from t_Role where	typeRole = @roleUser)
	SET @nameStatus = (select idStatus	from t_Status where	nameStatus = @statusUser)
	SET @statusGoogle = (select idGoogle from t_Google where	statusGoogle = @googleUser)


	insert into t_User (nameUser,lastnameUser,emailUser,passwordUser,imgUser,idRole,idStatus,idGoogle)
	values (@nameUser,@lastmaneUser,@emailUser,@passwordUser,@imgUser,@typeRole,@nameStatus,@statusGoogle)
	
	declare @lastId int
	set @lastId =@@IDENTITY

	exec GET_SP_SELECT_User @lastId
end
else
begin
	--select 0 as resultado
	print 'email ya se encuentra registrado'
	return
end

-- exec POST_SP_INSERT_User 'Prueba21','Prueba21','prueba21@prueba.com','123456','','USER_ROLE','ACTIVE','NO ENABLE'
