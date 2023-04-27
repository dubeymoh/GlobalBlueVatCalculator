using GlobalBlue_VAT_Calculator.Model;

namespace GlobalBlue_VAT_Calculator.Interface
{
    public interface IVatCalculatorService
    {
        //Returns a list of countries
        List<Country> GetCountries();

        // Returns a list of VAT rates for a given country
        Dictionary<string, List<int>> GetVatRates();
    }
}
    