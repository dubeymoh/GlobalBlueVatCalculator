using System.Collections;
using GlobalBlue_VAT_Calculator.Interface;
using GlobalBlue_VAT_Calculator.Model;
using GlobalBlue_VAT_Calculator.Helper;

namespace GlobalBlue_VAT_Calculator.Service
{
    public class VatCalculatorService : IVatCalculatorService
    { 
        public VatCalculatorService()
        {
        }

        /// <summary>
        /// GetCountries Method  returns a list of countries
        /// </summary>
        /// <returns>List<Country></returns>
        // Returns a list of available countries
        public List<Country> GetCountries()
        {
            return new List<Country> {
                new Country{ CountryName = Constants.Austria },
                new Country{ CountryName = Constants.UnitedKingdom },
                new Country{ CountryName = Constants.Portugal },
                new Country{ CountryName = Constants.Singapore }
            };
        }

        /// <summary>
        /// GetVatRates method returns the Applicable list of VatRate for countries
        /// </summary>
        /// <returns> Dictionary<string, List<int>></returns>
        public Dictionary<string, List<int>> GetVatRates()
        {
            return new Dictionary<string, List<int>>
            {
                [Constants.Austria] = new List<int> { 5, 10, 13, 20 },
                [Constants.UnitedKingdom] = new List<int> { 5, 20 },
                [Constants.Portugal] = new List<int> { 6, 13, 23 },
                [Constants.Singapore] = new List<int> { 7 }
            };
        }
    }
}
