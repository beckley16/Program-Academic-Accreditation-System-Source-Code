namespace AccreditationAPI.Core.Constants
{
    // This class will be used to avoid typing errors
    public static class StaticUserRoles
    {
        public const string SUPERADMIN = "SUPERADMIN";
        public const string ADMIN = "ADMIN";
        public const string FACULTYUSER = "FACULTYUSER";

        public const string SuperAdminAdmin = "SUPERADMIN,ADMIN";
        public const string SuperAdminAdminFacultyUser = "SUPERADMIN,ADMIN,FACULTYUSER";
        public const string SuperAdminAdminFacultyUserUser = "SUPERADMIN,ADMIN,FACULTYUSER";
    }
}
