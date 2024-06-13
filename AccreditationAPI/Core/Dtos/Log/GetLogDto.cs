namespace AccreditationAPI.Core.Dtos.Log
{
    public class GetLogDto
    {
        public DateTime CreatedDt { get; set; }  = DateTime.Now;

        public string? UserName { get; set; }   

        public string Description { get; set; } 
    }
}
