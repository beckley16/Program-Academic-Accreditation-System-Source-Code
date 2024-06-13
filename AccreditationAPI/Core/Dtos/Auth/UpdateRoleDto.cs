using System.ComponentModel.DataAnnotations;

namespace AccreditationAPI.Core.Dtos.Auth
{
    public class UpdateRoleDto
    {
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        public RoleType NewRole { get; set; }

    }
}

public enum RoleType
{
    ADMIN,
    FACULTYUSER,
    USER
}