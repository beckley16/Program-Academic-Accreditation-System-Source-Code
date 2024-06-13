namespace AccreditationAPI.Core.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }

        //Return to front-end
        public UserInfoResult UserInfo { get; set; }
    }
}
