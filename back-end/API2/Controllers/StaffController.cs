using API2.Common;
using API2.Models;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API2.Controllers
{
    [RoutePrefix("api/staff")]
    public class StaffController : ApiController
    {
        public StaffController()
        {

        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([FromUri(Name = "name")] string name = null)
        {
            using (var dbContext = new TaskManagementDbContext())
            {
                if (name is null || string.IsNullOrWhiteSpace(name))
                {
                    return Ok(new ApiResult(await dbContext.Staffs.ToListAsync()));
                }

                return Ok(new ApiResult
                       (await dbContext.Staffs
                            .Where(x => x.FullName.ToLower().Contains(name.ToLower()))
                            .ToListAsync()));

                //.FirstOrDefaultAsync(x => x.Id == name)));
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Staff staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var dbContext = new TaskManagementDbContext())
            {
                dbContext.Staffs.Add(new Staff()
                {
                    FullName = staff.FullName,
                    ShortName = staff.ShortName
                });

                return Ok(new ApiResult(await dbContext.SaveChangesAsync() > 0));
            }
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IHttpActionResult> Get(int Id)
        {
            using (var dbContext = new TaskManagementDbContext())
            {
                return Ok(new ApiResult(await dbContext.Staffs.FirstOrDefaultAsync(x => x.Id == Id)));
            }
        }

        [HttpPut]
        [Route("{Id}")]
        public async Task<IHttpActionResult> Put(int Id, [FromBody] Staff upd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var dbContext = new TaskManagementDbContext())
            {
                if (await dbContext.Staffs.FirstOrDefaultAsync(x => x.Id == Id) is Staff staff)
                {
                    staff.FullName = upd.FullName;
                    staff.ShortName = upd.ShortName;

                    return Ok(new ApiResult(await dbContext.SaveChangesAsync() > 0));
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
                if (await dbContext.Staffs.FirstOrDefaultAsync(x => x.Id == Id) is Staff staff)
                {
                    dbContext.Staffs.Remove(staff);
                    return Ok(new ApiResult(await dbContext.SaveChangesAsync() > 0));
                }
            }

            return NotFound();
        }
    }

}
