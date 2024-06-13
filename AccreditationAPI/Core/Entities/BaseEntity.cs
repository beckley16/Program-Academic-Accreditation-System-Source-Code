namespace AccreditationAPI.Core.Entities
{
    public class BaseEntity<TID>
    {
        public TID Id { get; set; }    

        public DateTime CreatedDt { get; set; }  = DateTime.Now;    

        public DateTime UpdatedDt { get; set;}

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;
    }   
}
