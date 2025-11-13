using Microsoft.AspNetCore.Mvc;
using Crud.Model;

namespace Crud.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PremiumController : ControllerBase
    {
        private static readonly List<Occupation> Occupations = new()
        {
            new Occupation { OccupationName = "Cleaner", Rating = "Light Manual" },
            new Occupation { OccupationName = "Doctor", Rating = "Professional" },
            new Occupation { OccupationName = "Author", Rating = "White Collar" },
            new Occupation { OccupationName = "Farmer", Rating = "Heavy Manual" },
            new Occupation { OccupationName = "Mechanic", Rating = "Heavy Manual" },
            new Occupation { OccupationName = "Florist", Rating = "Light Manual" },
            new Occupation { OccupationName = "Other", Rating = "Heavy Manual" }
        };

        private static readonly List<OccupationRating> Ratings = new()
        {
            new OccupationRating { Rating = "Professional", Factor = 1.5 },
            new OccupationRating { Rating = "White Collar", Factor = 2.25 },
            new OccupationRating { Rating = "Light Manual", Factor = 11.50 },
            new OccupationRating { Rating = "Heavy Manual", Factor = 31.75 }
        };

        [HttpGet("occupations")]
        public IActionResult GetOccupations()
        {
            return Ok(Occupations);
        }

        [HttpPost("calculate")]
        public IActionResult CalculatePremium([FromBody] MemberInput input)
        {
            if (input == null ||
                string.IsNullOrEmpty(input.Name) ||
                input.AgeNextBirthday <= 0 ||
                input.DeathSumInsured <= 0 ||
                string.IsNullOrEmpty(input.Occupation))
            {
                return BadRequest("All fields are mandatory.");
            }

            var occupation = Occupations.FirstOrDefault(o => o.OccupationName == input.Occupation);
            if (occupation == null)
                return BadRequest("Invalid occupation.");

            var rating = Ratings.FirstOrDefault(r => r.Rating == occupation.Rating);
            if (rating == null)
                return BadRequest("Rating not found.");

            // Formula: (Death Cover amount * Factor * Age) / 1000 * 12
            double premium = (input.DeathSumInsured * rating.Factor * input.AgeNextBirthday) / 1000 * 12;

            return Ok(new
            {
                input.Name,
                input.Occupation,
                Premium = Math.Round(premium, 2)
            });
        }
    }
}
