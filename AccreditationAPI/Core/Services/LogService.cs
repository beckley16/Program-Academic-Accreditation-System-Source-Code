using AccreditationAPI.Core.DbContext;
using AccreditationAPI.Core.Dtos.Log;
using AccreditationAPI.Core.Entities;
using AccreditationAPI.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AccreditationAPI.Core.Services
{
    public class LogService : ILogService
    {
        private readonly ApplicationDbContext _context;
        public LogService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task SaveNewLog(string UserName, string Desciption)
        {
            var newLog = new Log()
            {
                UserName = UserName,
                Description = Desciption
            };
            await _context.Logs.AddAsync(newLog); 
            await _context.SaveChangesAsync();  
        }
        public async Task<IEnumerable<GetLogDto>> GetLogsAsync()
        {
            var logs = await _context.Logs
                .Select(x => new GetLogDto()
                {
                    CreatedDt = x.CreatedDt,
                    Description = x.Description,
                    UserName = x.UserName,
                }).OrderByDescending(x => x.CreatedDt)
                .ToListAsync();
            return logs;
                
        }

        public async Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User)
        {
            var logs = await _context.Logs
                .Where(x => x.UserName == User.Identity.Name)
                .Select(x => new GetLogDto()
                {
                    CreatedDt = x.CreatedDt,
                    Description = x.Description,
                    UserName = x.UserName,
                }).OrderByDescending(x => x.CreatedDt)
                .ToListAsync();
            return logs;
        }

        
    }
}
