using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccreditationAPI.Core.Entities
{
    public class AccountUser : IdentityUser
    {
        public DateTime CreatedDt { get; set; } = DateTime.Now;

        public string Faculty { get; set; }

        [NotMapped]
        public IList<string> Roles { get; set; }

    }
}
