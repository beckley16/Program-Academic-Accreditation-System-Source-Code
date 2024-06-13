using Microsoft.AspNetCore.Mvc;
using AccreditationAPI.Core.DbContext;
using Microsoft.AspNetCore.Http;
using AccreditationAPI.Core.Entities;
using AccreditationAPI.Core.Dtos.Programme;
using Microsoft.EntityFrameworkCore;
using AccreditationAPI.Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using AccreditationAPI.Core.Dtos.General;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.Runtime.Intrinsics.X86;

namespace AccreditationAPI.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgrammeController : ControllerBase
    {

        private ApplicationDbContext _context { get; }
        private readonly UserManager<AccountUser> _userManager;

        public ProgrammeController(ApplicationDbContext context)
        {
            _context = context;
        }


        //CREATE
        [HttpPost]
        [Route("create")]
        //[Authorize(Roles = StaticUserRoles.SuperAdminAdmin)]
        public async Task<IActionResult> CreateProgram([FromBody]CreateProgrammeDto programmeDto)
        {
            var isExistProgram = await _context.Programmes.FindAsync(programmeDto.ProgramID);
            if (isExistProgram is not null)
            {
                var message = new GeneralServiceResponseDto()
                {
                    IsSuceed = false,
                    StatusCode = 409,
                    Message = "Program Exist"

                };
                return StatusCode(message.StatusCode, message.Message);

            }
            else
            {
                
                var programme = new Programme()
                {
                    ProgramID = programmeDto.ProgramID,
                    ProgramNameEng = programmeDto.ProgramNameEng,
                    ProgramNameMalay = programmeDto.ProgramNameMalay,
                    Faculty = programmeDto.Faculty,
                    ExpiryDate = programmeDto.ExpiryDate,
                    AccreditationType = programmeDto.AccreditationType,
                    Status = programmeDto.Status,
                    MQRNum = programmeDto.MQRNum,
                    ReferredMQRNum = programmeDto.ReferredMQRNum,
                    RegisteredMQR = programmeDto.RegisteredMQR,
                    StudyMode = programmeDto.StudyMode,
                    NECCode = programmeDto.NECCode,
                    MinDurationOfStudy = programmeDto.MinDurationOfStudy,
                    MaxDurationOfStudy = programmeDto.MaxDurationOfStudy,
                    CreditHrs = programmeDto.CreditHrs,
                    ApprovedDateSenate = programmeDto.ApprovedDateSenate,
                    AccreditationStatus = programmeDto.AccreditationStatus,
                    ApprovalCertJPT = programmeDto.ApprovalCertJPT,
                    Remarks = programmeDto.Remarks,
                    PhaseReAccreditation = programmeDto.PhaseReAccreditation,   
                    ApprovedDateSenateReAccreditation = programmeDto.ApprovedDateSenateReAccreditation,
                    DurationReAccreditation = programmeDto.DurationReAccreditation,
                    RemarksReAccreditation = programmeDto.RemarksReAccreditation
                };

                await _context.Programmes.AddAsync(programme);
                await _context.SaveChangesAsync();
                

                var message = new GeneralServiceResponseDto()
                {
                    IsSuceed = true,
                    StatusCode = 200,
                    Message = "Program Saved Succesfully"

                };
                return StatusCode(message.StatusCode, message.Message);
            }
            
        }

        //READ
        [HttpGet]
        public async Task<ActionResult<List<Programme>>> GetAllProgram()
        {
            var programme = await _context.Programmes.ToListAsync();
            return Ok(programme);   
        }

        [HttpGet]
        [Route("{programId}")]
        public async Task<ActionResult<Programme>> GetProgramByPogramId([FromRoute] string programId)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(q => q.ProgramID == programId);
            if(programme is null)
            {
                return NotFound("Programme not found");
            }
            return Ok(programme);
        }


        //ADMIN UPDATE
        [HttpPut]
        [Route("update-programme/{programId}")]
     
        public async Task<IActionResult> UpdateProgramme([FromRoute] string programId, [FromBody] AdminUpdateProgrammeDto adminUpdateprogrammeDto)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(q => q.ProgramID == programId);
            if (programme is null)
            {
                return NotFound("Programme not found");
            }
            if (programme.AccreditationType == "Full Accreditation")
            {
                programme.ProgramNameEng = adminUpdateprogrammeDto.ProgramNameEng;
                programme.ProgramNameMalay = adminUpdateprogrammeDto.ProgramNameMalay;
                programme.Faculty = adminUpdateprogrammeDto.Faculty;
                programme.ExpiryDate = adminUpdateprogrammeDto.ExpiryDate;
                programme.Status = adminUpdateprogrammeDto.Status;
                programme.AccreditationType = adminUpdateprogrammeDto.AccreditationType;
                programme.MQRNum = adminUpdateprogrammeDto.MQRNum;
                programme.ReferredMQRNum = adminUpdateprogrammeDto.ReferredMQRNum;
                programme.RegisteredMQR = adminUpdateprogrammeDto.RegisteredMQR;
                programme.StudyMode = adminUpdateprogrammeDto.StudyMode;
                programme.NECCode = adminUpdateprogrammeDto.NECCode;
                programme.MinDurationOfStudy = adminUpdateprogrammeDto.MinDurationOfStudy;
                programme.MaxDurationOfStudy = adminUpdateprogrammeDto.MaxDurationOfStudy;
                programme.CreditHrs = adminUpdateprogrammeDto.CreditHrs;
                programme.ApprovedDateSenate = adminUpdateprogrammeDto.ApprovedDateSenate;
                programme.AccreditationStatus = adminUpdateprogrammeDto.AccreditationStatus;
                programme.ApprovalCertJPT = adminUpdateprogrammeDto.ApprovalCertJPT;
                programme.Remarks = adminUpdateprogrammeDto.Remarks;

            }
            else
            {
                programme.ProgramNameEng = adminUpdateprogrammeDto.ProgramNameEng;
                programme.ProgramNameMalay = adminUpdateprogrammeDto.ProgramNameMalay;
                programme.Faculty = adminUpdateprogrammeDto.Faculty;
                programme.ExpiryDate = adminUpdateprogrammeDto.ExpiryDate;
                programme.Status = adminUpdateprogrammeDto.Status;
                programme.AccreditationType = adminUpdateprogrammeDto.AccreditationType;
                programme.MQRNum = adminUpdateprogrammeDto.MQRNum;
                programme.ReferredMQRNum = adminUpdateprogrammeDto.ReferredMQRNum;
                programme.RegisteredMQR = adminUpdateprogrammeDto.RegisteredMQR;
                programme.StudyMode = adminUpdateprogrammeDto.StudyMode;
                programme.NECCode = adminUpdateprogrammeDto.NECCode;
                programme.MinDurationOfStudy = adminUpdateprogrammeDto.MinDurationOfStudy;
                programme.MaxDurationOfStudy = adminUpdateprogrammeDto.MaxDurationOfStudy;
                programme.CreditHrs = adminUpdateprogrammeDto.CreditHrs;
                programme.ApprovedDateSenate = adminUpdateprogrammeDto.ApprovedDateSenate;
                programme.AccreditationStatus = adminUpdateprogrammeDto.AccreditationStatus;
                programme.ApprovalCertJPT = adminUpdateprogrammeDto.ApprovalCertJPT;
                programme.Remarks = adminUpdateprogrammeDto.Remarks;
                programme.PhaseReAccreditation = adminUpdateprogrammeDto.PhaseReAccreditation;
                programme.ApprovedDateSenateReAccreditation = adminUpdateprogrammeDto.ApprovedDateSenateReAccreditation;
                programme.DurationReAccreditation = adminUpdateprogrammeDto.DurationReAccreditation;
                programme.RemarksReAccreditation = adminUpdateprogrammeDto.RemarksReAccreditation;
            }

            await _context.SaveChangesAsync();

            return Ok("Programme updated successfully");
        }

        //FACULTYUSER UPDATE
        [HttpPut]
        [Route("facultyuser-update-programme/{programId}")]

        public async Task<IActionResult> FacultyUserUpdateProgramme([FromRoute] string programId, [FromForm] FacultyUserUpdateProgrammeDto facultyUserUpdateprogrammeDto, IFormFile pdfFile)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(q => q.ProgramID == programId);
            if (programme is null)
            {
                return NotFound("Programme not found");
            }
            // first => save pdf to server
            // then => save url to entity
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";
            
            if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType) 
            {
                return BadRequest("File is invalid");
            }

            var programmeDocUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", programmeDocUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }
            programme.ProgrammeDocUrl = programmeDocUrl;
            await _context.SaveChangesAsync();

            return Ok("Programme updated successfully");
        }

        //Download pdf file
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }


        //DELETE
        /*
        [HttpDelete]
        [Route("{programId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] string programId)
        {
            var programme = await _context.Programmes.FirstOrDefaultAsync(q => q.ProgramID == programId);
            if (programme is null)
            {
                return NotFound("Programme not found");
            }
            _context.Programmes.Remove(programme);
            _context.SaveChangesAsync();

            return Ok("Product deleted successfully");

        }
        */
    }
}
