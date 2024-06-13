-- This is the SQL Script to send automated email to users with expiring programme in 2 weeks

DECLARE @START_DT DATE = (SELECT DATEADD(WEEK, DATEDIFF(WEEK,0,GETDATE())+2,0))
DECLARE @END_DT DATE = (SELECT DATEADD(WEEK,DATEDIFF(WEEK,0,GETDATE())+3,-1))
DECLARE @xml NVARCHAR(MAX)
DECLARE @body NVARCHAR(MAX)
DECLARE @RECIPIENTS NVARCHAR(MAX)

SELECT @RECIPIENTS = STUFF((SELECT DISTINCT ';' +  A.Email from Users A JOIN Programme B ON A.Faculty = B.Faculty WHERE B.ExpiryDate >= @START_DT and ExpiryDate <= @END_DT FOR XML PATH('')),1,1,'')

SET @xml = CAST((SELECT [ProgramID] AS 'td','',[ProgramNameEng] AS 'td','',[Faculty] AS 'td','',[ExpiryDate] AS 'td' 
FROM Programme WHERE ExpiryDate >= @START_DT and ExpiryDate <= @END_DT
ORDER BY ProgramID
FOR XML PATH('tr'),ELEMENTS) AS NVARCHAR(MAX))

SET @body = '<html><body><p>Greetings,<br> <br>This is your third and <b>final</b> reminder. You are getting this reminder email as one of the programme under your faculty is going to expire soon. Please refer to the table in the email for more details. <br><br>Please be reminded that the following programmes are approaching the deadline for the accreditation process in 2 weeks time. As such, please ensure that your report for the programme under your faculty is done and compiled in one pdf document. Please submit the documents through the Program Academic Accreditation System as soon as possible. If you have already submitted the necessary document, you may ignore this email. Your cooperation is highly appreciated. <br><br> Best regards,<br>Quality Management and Enhancement Centre (QMEC) Team</p>
<table border = 1>
<tr>
<th> Program ID </th> <th> English Program Name </th> <th> Faculty </th> <th> Expiry Date </th></tr>'

SET @body = @body + @xml + '</table></body></html>'

EXEC msdb.dbo.sp_send_dbmail
@profile_name = 'Notifications', -- replace with your SQL Database Mail Profile 
@body = @body,
@body_format ='HTML',
@recipients =@RECIPIENTS ,-- replace with your email address
@subject = 'QMEC Email Alert on Expired Programme' ;