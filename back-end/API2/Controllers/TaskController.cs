using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using API2.Common;
using API2.Models;

namespace API2.Controllers
{
    [RoutePrefix("api/task")]
    public class TaskController : ApiController
    {
        public TaskController()
        {

        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([FromUri(Name = "Id")] int? Id = null)
        {
            using (var dbContext = new TaskManagementDbContext())
            {
                if (Id is null)
                {
                    var result = await dbContext.Tasks.ToListAsync();
                    var staffInTask = await dbContext.StaffInTasks.ToListAsync();

                    result.ForEach(x =>
                    {
                        x.StartDate.ToString("yyyyMMdd");
                        x.StaffId = staffInTask.First(y => y.IdTask == x.Id).IdStaff;
                    });


                    return Ok(new ApiResult(result));
                }

                return Ok(new ApiResult
                       (await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == Id)));
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Models.DTO.TaskDto task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (var dbContext = new TaskManagementDbContext())
                {
                    dbContext.Tasks.Add(new Models.Task()
                    {
                        IdParent = task.IdParent,
                        Id = task.Id,
                        Label = task.Label ?? string.Empty,
                        Type = task.Type ?? string.Empty,
                        Name = task.Name,
                        StartDate = task.StartDate,
                        EndDate = task.EndDate,
                        Duration = task.Duration,
                        Progress = task.Progress,
                        IsUnscheduled = task.IsUnscheduled
                    });

                    await dbContext.SaveChangesAsync();

                    var lastId = await dbContext.Tasks.OrderByDescending(x => x.Id).FirstOrDefaultAsync();

                    dbContext.StaffInTasks.Add(new StaffInTask()
                    {
                        IdStaff = task.StaffId,
                        IdTask = lastId.Id
                    });

                    await dbContext.SaveChangesAsync();


                    return Ok(new ApiResult(true));
                }
            }
            catch (System.Exception ex)
            {

                throw;
            }

        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IHttpActionResult> Get(int Id)
        {
            using (var dbContext = new TaskManagementDbContext())
            {
                return Ok(new ApiResult(await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == Id)));
            }
        }

        [HttpPut]
        [Route("{Id}")]
        public async Task<IHttpActionResult> Put(int Id, [FromBody] Models.DTO.TaskDto upd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var dbContext = new TaskManagementDbContext())
            {
                if (await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == Id) is Models.Task task)
                {
                    task.IdParent = upd.IdParent;
                    task.Label = upd.Label ?? string.Empty;
                    task.Type = upd.Type ?? string.Empty;
                    task.Name = upd.Name;
                    task.StartDate = upd.StartDate;
                    task.EndDate = upd.EndDate;
                    task.Duration = upd.Duration;
                    task.Progress = upd.Progress;
                    task.IsUnscheduled = upd.IsUnscheduled;

                    var staffInTask = await dbContext.StaffInTasks.FirstOrDefaultAsync(x => x.IdTask == Id);
                    staffInTask.IdStaff = upd.StaffId;

                    await dbContext.SaveChangesAsync();

                    return Ok(new ApiResult(true));
                }
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IHttpActionResult> Delelte(int Id)
        {
            using (var dbContext = new TaskManagementDbContext())
            {
                if (await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == Id) is Models.Task task)
                {
                    dbContext.Tasks.Remove(task);
                    return Ok(new ApiResult(await dbContext.SaveChangesAsync() > 0));
                }
            }

            return NotFound();
        }
    }
}