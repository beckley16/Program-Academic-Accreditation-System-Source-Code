using AccreditationAPI.Core.Constants;
using AccreditationAPI.Core.Dtos.Auth;
using AccreditationAPI.Core.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace AccreditationAPI.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        // Route -> Seed Roles to DB
        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedResult = await _authService.SeedRolesAsync();
            return StatusCode(seedResult.StatusCode, seedResult.Message);
        }


        //Route -> Register
        [HttpPost]
        [Route("register")]
        
        public async Task<IActionResult>Regster([FromBody]RegisterDto registerDto)
        {
            var registerResult = await _authService.RegisterAsync(registerDto); 
            return StatusCode(registerResult.StatusCode, registerResult.Message);   
        }

        //Route -> Login
        [HttpPost]
        [Route("login")]

        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);
            if(loginResult is null)
            {
                return Unauthorized("Your credentials are invalid. Please contact to an Admin");
            }
            return Ok(loginResult);
            
        }

        //Route -> Update User Role
        [HttpPost]
        [Route("update-role")]
        [Authorize(Roles = StaticUserRoles.SuperAdminAdmin)]

        public async Task<IActionResult> UpdateRole([FromBody]UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await _authService.UpdateRoleAsync(User, updateRoleDto); 

            if(updateRoleResult.IsSuceed)
            {
                return Ok(updateRoleResult.Message);
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode, updateRoleResult.Message);
            }
        }

        //Route -> getting data of a user from its JWT
        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody] MeDto token)
        {
            try
            {
                var me = await _authService.MeAsync(token); 
                if(me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("Invalid token");
                }
            }
            catch(Exception)
            {
                return Unauthorized("Invalid token");
            }
        }

        //Route -> List of all users with details
        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserInfoResult>>>GetUserList()
        {
            var userList = await _authService.GetUsersListAsync();  
            return Ok(userList);   
        }

        //Route -> get a user by username
        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserInfoResult>> GetUserDetailsByUserName([FromRoute] string userName)
        {
            var user = await _authService.GetUserDetailsByUserNameAsync(userName);
            if(user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("UserName is not found");
            }
        }


        
    }
}
