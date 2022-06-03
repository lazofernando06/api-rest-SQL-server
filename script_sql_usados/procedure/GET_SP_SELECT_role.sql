alter PROC GET_SP_SELECT_role(
										@typeRole varchar(100) = ''
										)
AS
set nocount on

if exists(select * from t_Role where typeRole = @typeRole)
begin
	select *	from t_Role
	WHERE typeRole = @typeRole

end
else
begin
	--select 0 as resultado
	print 'obtener role por typeRole'
	return
end

	-- exec GET_SP_SELECT_role 'DEV_ROLE'

