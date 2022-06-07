alter PROC GET_SP_SELECT_status(
										@nameStatus varchar(100) = ''
										)
AS
set nocount on

if exists(select * from t_Status where nameStatus = @nameStatus)
begin
	select idStatus as 'id',nameStatus as 'status'	from t_Status
	WHERE nameStatus = @nameStatus

end
else
begin
	--select 0 as resultado
	print 'obtener status por nameStatus'
	return
end

	-- exec GET_SP_SELECT_status 'ACTIVE'

