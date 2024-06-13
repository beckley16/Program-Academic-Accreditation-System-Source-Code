using System.ComponentModel.DataAnnotations;

namespace AccreditationAPI.Core.Dtos.Auth
{
    public class RegisterDto
    {
        [Required(ErrorMessage ="UserName is required")]
        public string UserName { get; set; }
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Roles is required")]
        
        public NewUserPosition Position  { get; set; }

        public string? Faculty { get; set; }
    }
}

public enum NewUserPosition
{
    UM_STAFF,
    UM_FACULTYSTAFF
}

public enum NewUserFaculty
{ 
    NONE,
    Academy_of_Islamic_Studies,
    SCIENCE
}

