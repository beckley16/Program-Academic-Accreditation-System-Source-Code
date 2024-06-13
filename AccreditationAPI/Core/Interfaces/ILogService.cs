using AccreditationAPI.Core.Dtos.Log;
using System.Security.Claims;

namespace AccreditationAPI.Core.Interfaces
{
    public interface ILogService
    {
        Task SaveNewLog(string UserName, string Desciption);
        Task<IEnumerable<GetLogDto>> GetLogsAsync();
        Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User);
    }
}
