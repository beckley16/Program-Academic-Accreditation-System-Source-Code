using AccreditationAPI.Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccreditationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("get-public")]

        public IActionResult GetPublicData()
        {
            return Ok("Public Data");
        }
        /*
        [HttpGet]
        [Route("get-user-role")]
        [Authorize(Roles = StaticUserRoles)]
        public IActionResult GetUserData()
        {
            return Ok("User role Data");
        }
        \*/
        [HttpGet]
        [Route("get-facultyUser-role")]
        [Authorize(Roles = StaticUserRoles.FACULTYUSER)]
        public IActionResult GetFacultyUserData()
        {
            return Ok("Faculty User role Data");
        }

        [HttpGet]
        [Route("get-admin-role")]
        [Authorize(Roles = StaticUserRoles.ADMIN)]
        public IActionResult GetAdminData()
        {
            return Ok("Admin role Data");
        }

        [HttpGet]
        [Route("get-owner-role")]
        [Authorize(Roles = StaticUserRoles.SUPERADMIN)]
        public IActionResult GetSuperAdminData()
        {
            return Ok("Super Admin role Data");
        }

    }
}
