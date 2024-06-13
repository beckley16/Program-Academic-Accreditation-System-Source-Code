using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccreditationAPI.Core.Entities
{
    public class Programme:BaseEntity<long>
    {
        [Key]
        public string? ProgramID { get; set; }

        public string? ProgramNameEng { get; set; }

        public string? ProgramNameMalay { get; set; }

        public string? Faculty { get; set; }

        public string? AccreditationType { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ExpiryDate { get; set; }
        public string? Status { get; set; } 

        public string? ProgrammeDocUrl { get; set; } 

        public int? MQRNum { get; set; }    

        public string? ReferredMQRNum { get; set; }

        public string? RegisteredMQR { get; set; }

        public string? StudyMode {  get; set; } 

        public string? NECCode {  get; set; }   

        public int? MinDurationOfStudy { get; set; }

        public int? MaxDurationOfStudy { get; set; }

        public string? CreditHrs { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ApprovedDateSenate { get; set; }

        public string? AccreditationStatus { get; set; }    

        public string? ApprovalCertJPT { get; set; }

        public string? Remarks { get; set; }    

        public string? PhaseReAccreditation { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ApprovedDateSenateReAccreditation { get; set; }

        public string? DurationReAccreditation { get; set; }    

        public string? RemarksReAccreditation { get;set; }

        


    }
}
