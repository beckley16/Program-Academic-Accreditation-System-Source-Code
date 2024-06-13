-- This is the SQL Script to setup the database email
-- Before setting up the automated job, need to init the database from the C# through Visual Studio.
-- Firstly, for automated email, have to setup a SQL Server Agent job firstly, and schedule it daily and decide a time for the schedule.
-- If not the email will not send out.
sp_configure 'show advanced options', 1;
GO
RECONFIGURE;
GO
 
sp_configure 'Database Mail XPs', 1;
GO
RECONFIGURE
GO


EXECUTE msdb.dbo.sysmail_add_profile_sp  
    @profile_name = 'Notifications',  
    @description = 'Profile used for sending outgoing notifications using Gmail.' ;  
GO
EXECUTE msdb.dbo.sysmail_add_principalprofile_sp  
    @profile_name = 'Notifications',  
    @principal_name = 'public',  
    @is_default = 1 ;
GO


EXECUTE msdb.dbo.sysmail_add_account_sp  
    @account_name = 'QMEC',  
    @description = 'Mail account for sending outgoing notifications.',  
    @email_address = 'beckley.darrell@gmail.com',  
    @display_name = 'QMEC',  
    @mailserver_name = 'smtp.gmail.com',
    @port = 587,
    @enable_ssl = 1,
    @username = 'beckley.darrell@gmail.com',
    @password = 'volqnhpmwwwirkub' ;  
GO

EXECUTE msdb.dbo.sysmail_add_profileaccount_sp  
    @profile_name = 'Notifications',  
    @account_name = 'QMEC',  
    @sequence_number =1 ;  
GO

EXEC msdb.dbo.sp_send_dbmail
     @profile_name = 'Notifications',
     @recipients = 'wenshanchan@gmail.com',
     @body = 'The database mail configuration was completed successfully.',
     @subject = 'Automated Success Message';
GO