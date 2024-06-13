 namespace AccreditationAPI.Core.Dtos.Auth
{
    public class UserInfoResult
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public DateTime CreatedDt { get; set; } 

        public IEnumerable<string> Roles { get; set; }
        public string Faculty { get; set; }
    }
}
