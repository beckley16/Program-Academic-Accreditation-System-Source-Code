using System.Security.Cryptography.X509Certificates;

namespace AccreditationAPI.Core.Entities
{
    public class Log: BaseEntity<long>
    {
        public string? UserName { get; set; }   

        public string Description { get; set; } 
    }
}
