alter PROC GET_SP_SELECT_google(
										@statusGoogle varchar(100) = ''
										)
AS
set nocount on

if exists(select * from t_Google where statusGoogle = @statusGoogle)
begin
	select *	from t_Google
	WHERE statusGoogle = @statusGoogle

end
else
begin
	--select 0 as resultado
	print 'obtener google por nameStatus'
	return
end

	-- exec GET_SP_SELECT_role 'DEV_ROLE'

