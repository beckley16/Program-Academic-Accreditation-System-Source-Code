using AccreditationAPI.Core.Dtos.Auth;
using AccreditationAPI.Core.Dtos.General;
using AccreditationAPI.Core.Interfaces;
using AccreditationAPI.Core.Entities;
using AccreditationAPI.Core.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AccreditationAPI.Core.DbContext;
using Microsoft.Identity.Client.Extensions.Msal;
using Microsoft.AspNetCore.Http;

namespace AccreditationAPI.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AccountUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogService _logService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(UserManager<AccountUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logService = logService;
            _configuration = configuration;
        }

        public async Task<GeneralServiceResponseDto> SeedRolesAsync()
        {
            
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.SUPERADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.FACULTYUSER));

            bool isSuperAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.SUPERADMIN);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isFacultyUserRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.FACULTYUSER);

            if (isSuperAdminRoleExists && isAdminRoleExists && isFacultyUserRoleExists)
                return new GeneralServiceResponseDto()
                {
                    IsSuceed = true,
                    StatusCode = 200,
                    Message = "Roles Seeding is Already Done"
                };

            return new GeneralServiceResponseDto()
            {
                IsSuceed = true,
                StatusCode = 201,
                Message = "Roles Seeding Done Successfully"
            };
        }


        /*
        public async Task<GeneralServiceResponseDto> SeedFaculty(ApplicationDbContext context)
        {
            
            if (!context.Faculty.Any())
            {
                var faculty = new List<StaticUserFaculty>();
                context.AddRangeAsync(faculty);
                context.SaveChanges();

            }
                
                
            
            var fsktm = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.FSKTM).Single();
            var fbl = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.FBL).Single();
            var pharmacy = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.PHARMACY).Single();
            var engine = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.ENGINE).Single();
            var edu = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.EDU).Single();
            var dentistry = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.DENTISTRY).Single();
            var fbac = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.FBAC).Single();
            var medic = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.MEDIC).Single();
            var science = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.SCIENCE).Single();
            var fsss = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.FSSS).Single();
            var fces = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.FCES).Single();
            var law = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.LAW).Single();
            var ses = context.Faculty.Where(a => a.FacultyName == StaticUserFaculty.SES).Single();

            if (fsktm != null && fbl != null && pharmacy != null && engine != null && edu != null && dentistry != null && fbac != null && medic != null && science != null && fsss != null && fces != null && law != null && ses != null)
                return new GeneralServiceResponseDto()
                {
                    IsSuceed = true,
                    StatusCode = 200,
                    Message = "Roles Seeding is Already Done"
                };


            return new GeneralServiceResponseDto()
            {
                IsSuceed = true,
                StatusCode = 201,
                Message = "Roles Seeding Done Successfully"
            };

        }
        */
        public async Task<GeneralServiceResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isExistsUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isExistsUser is not null)
                return new GeneralServiceResponseDto()
                {
                    IsSuceed = false,
                    StatusCode = 409,
                    Message = "UserName Already Exists"
                };
            
            if(registerDto.Position == NewUserPosition.UM_STAFF)
              
            {
                AccountUser newUser = new AccountUser()
                {
                    Email = registerDto.Email,
                    UserName = registerDto.UserName,
                    Faculty = registerDto.Faculty.ToString(),
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                
                var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);
                if (!createUserResult.Succeeded)
                {
                    var errorString = "User Creation failed because: ";
                    foreach (var error in createUserResult.Errors)
                    {
                        errorString += " # " + error.Description;
                    }
                    return new GeneralServiceResponseDto()
                    {
                        IsSuceed = false,
                        StatusCode = 400,
                        Message = errorString
                    };
                }

                // Add a Default USER Role to all users
                //await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);
                await _userManager.AddToRoleAsync(newUser, StaticUserRoles.ADMIN);
                //await _context.AddAsync(newUser);
                await _logService.SaveNewLog(newUser.UserName, "Registered to Website");

            }
            else
            {

                AccountUser newUser = new AccountUser()
                {
                    Email = registerDto.Email,
                    UserName = registerDto.UserName,
                    Faculty = registerDto.Faculty.ToString(),
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                
                var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);
                if (!createUserResult.Succeeded)
                {
                    var errorString = "User Creation failed because: ";
                    foreach (var error in createUserResult.Errors)
                    {
                        errorString += " # " + error.Description;
                    }
                    return new GeneralServiceResponseDto()
                    {
                        IsSuceed = false,
                        StatusCode = 400,
                        Message = errorString
                    };
                }


                // Add a Default USER Role to all users
                //await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);
                await _userManager.AddToRoleAsync(newUser, StaticUserRoles.FACULTYUSER);
               // await _context.AddAsync(newUser);
                await _logService.SaveNewLog(newUser.UserName, "Registered to Website");

            }
            


            

            return new GeneralServiceResponseDto()
            {
                IsSuceed = true,
                StatusCode = 201,
                Message = "User Created Successfully"
            };
        }

        public async Task<LoginServiceResponseDto?> LoginAsync(LoginDto loginDto)
        {
            // Find user with username
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user is null)
                return null;

            // check password of user
            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordCorrect)
                return null;

            // Return Token and userInfo to front-end
            var newToken = await GenerateJWTTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            await _logService.SaveNewLog(user.UserName, "New Login");

            return new LoginServiceResponseDto()
            {
                NewToken = newToken,
                UserInfo = userInfo
            };
        }

        public async Task<GeneralServiceResponseDto> UpdateRoleAsync(ClaimsPrincipal User, UpdateRoleDto updateRoleDto)
        {
            var user = await _userManager.FindByNameAsync(updateRoleDto.UserName);
            if (user is null)
                return new GeneralServiceResponseDto()
                {
                    IsSuceed = false,
                    StatusCode = 404,
                    Message = "Invalid UserName"
                };

            var userRoles = await _userManager.GetRolesAsync(user);
            // Just The OWNER and ADMIN can update roles
            if (User.IsInRole(StaticUserRoles.ADMIN))
            {
                // User is admin
                if (updateRoleDto.NewRole == RoleType.USER || updateRoleDto.NewRole == RoleType.FACULTYUSER)
                {
                    // admin can change the role of everyone except for super admins
                    if (userRoles.Any(q => q.Equals(StaticUserRoles.SUPERADMIN) || q.Equals(StaticUserRoles.ADMIN)))
                    {
                        return new GeneralServiceResponseDto()
                        {
                            IsSuceed = false,
                            StatusCode = 403,
                            Message = "You are not allowed  change role of this user"
                        };
                    }
                    else
                    {
                        await _userManager.RemoveFromRolesAsync(user, userRoles);
                        await _userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                        await _logService.SaveNewLog(user.UserName, "User Roles Updated");
                        return new GeneralServiceResponseDto()
                        {
                            IsSuceed = true,       
                            StatusCode = 200,
                            Message = "Role updated successfully"
                        };
                    }
                }
                else return new GeneralServiceResponseDto()
                {
                    IsSuceed = false,
                    StatusCode = 403,
                    Message = "You are not allowed to change role of this user"
                };
            }
            else
            {
                // user is super admin
                if (userRoles.Any(q => q.Equals(StaticUserRoles.SUPERADMIN)))
                {
                    return new GeneralServiceResponseDto()
                    {
                        IsSuceed = false,
                        StatusCode = 403,
                        Message = "You are not allowed to change role of this user"
                    };
                }
                else
                {
                    await _userManager.RemoveFromRolesAsync(user, userRoles);
                    await _userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                    await _logService.SaveNewLog(user.UserName, "User Roles Updated");

                    return new GeneralServiceResponseDto()
                    {
                        IsSuceed = true,
                        StatusCode = 200,
                        Message = "Role updated successfully"
                    };
                }
            }
        }

        public async Task<LoginServiceResponseDto?> MeAsync(MeDto meDto)
        {
            ClaimsPrincipal handler = new JwtSecurityTokenHandler().ValidateToken(meDto.Token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                ValidAudience = _configuration["JWT:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]))
            }, out SecurityToken securityToken);

            string decodedUserName = handler.Claims.First(q => q.Type == ClaimTypes.Name).Value;
            if (decodedUserName is null)
                return null;

            var user = await _userManager.FindByNameAsync(decodedUserName);
            if (user is null)
                return null;

            var newToken = await GenerateJWTTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            await _logService.SaveNewLog(user.UserName, "New Token Generated");

            return new LoginServiceResponseDto()
            {
                NewToken = newToken,
                UserInfo = userInfo
            };
        }

        public async Task<IEnumerable<UserInfoResult>> GetUsersListAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            List<UserInfoResult> userInfoResults = new List<UserInfoResult>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userInfo = GenerateUserInfoObject(user, roles);
                userInfoResults.Add(userInfo);
            }

            return userInfoResults;
        }

        public async Task<UserInfoResult?> GetUserDetailsByUserNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user is null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            return userInfo;
        }

        public async Task<IEnumerable<string>> GetUsernamesListAsync()
        {
            var userNames = await _userManager.Users
                .Select(q => q.UserName)
                .ToListAsync();

            return userNames;
        }

        //GenerateJWTTokenAsync
        private async Task<string> GenerateJWTTokenAsync(AccountUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256);

            var tokenObject = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(1),
                claims: authClaims,
                signingCredentials: signingCredentials
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);
            return token;
        }

        //GenerateUserInfoObject
        private UserInfoResult GenerateUserInfoObject(AccountUser user, IEnumerable<string> Roles)
        {
            // Instead of this, You can use Automapper packages. But i don't want it in this project
            return new UserInfoResult()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                CreatedDt = user.CreatedDt,
                Roles = Roles,
                Faculty = user.Faculty,
            };
        }

        
    }
}
