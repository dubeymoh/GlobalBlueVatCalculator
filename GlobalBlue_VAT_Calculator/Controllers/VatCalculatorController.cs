using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GlobalBlue_VAT_Calculator.Interface;

namespace GlobalBlue_VAT_Calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VatCalculatorController : ControllerBase
    {
        private readonly IVatCalculatorService _vatCalculatorService;

        public VatCalculatorController(IVatCalculatorService vatCalculatorService)
        {
            _vatCalculatorService = vatCalculatorService;
        }

        [HttpGet, Route("GetCountries")]
        public IActionResult GetCountries()
        {
            try
            {               
                var countries= _vatCalculatorService.GetCountries();
                return Ok(countries);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error while fetaching the data");
            }
        }

        [HttpGet("GetVatRates")]
        public IActionResult GetVatRates()
        {
            try
            {
                var rates = _vatCalculatorService.GetVatRates();
                return Ok(rates);
            }
            catch (Exception ex)
            {
               return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error while fetaching the data");
            }
        }


    }
}
