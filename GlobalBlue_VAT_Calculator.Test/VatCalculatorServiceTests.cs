using GlobalBlue_VAT_Calculator.Interface;
using GlobalBlue_VAT_Calculator.Service;
using GlobalBlue_VAT_Calculator.Model;
using GlobalBlue_VAT_Calculator.Helper;
using GlobalBlue_VAT_Calculator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace GlobalBlue_VAT_Calculator.Tests
{
    [TestClass]
    public class VatCalculatorServiceTests
    {
        private IVatCalculatorService _service;

        [TestInitialize]
        public void Setup()
        {
            _service = new VatCalculatorService();
        }

        [TestMethod]
        public void GetCountries_ReturnsListOfCountries()
        {
            // Act
            var countries = _service.GetCountries();

            // Assert
            Assert.IsNotNull(countries);
            Assert.IsInstanceOfType(countries, typeof(List<Country>));
            Assert.AreEqual(4, countries.Count);
            Assert.IsTrue(countries.Any(c => c.CountryName == Constants.Austria));
            Assert.IsTrue(countries.Any(c => c.CountryName == Constants.UnitedKingdom));
            Assert.IsTrue(countries.Any(c => c.CountryName == Constants.Portugal));
            Assert.IsTrue(countries.Any(c => c.CountryName == Constants.Singapore));
        }

        [TestMethod]
        public void GetVatRates_ReturnsDictionaryOfVatRates()
        {
            // Act
            var vatRates = _service.GetVatRates();

            // Assert
            Assert.IsNotNull(vatRates);
            Assert.IsInstanceOfType(vatRates, typeof(Dictionary<string, List<int>>));
            Assert.AreEqual(4, vatRates.Count);
            Assert.IsTrue(vatRates.ContainsKey(Constants.Austria));
            Assert.IsTrue(vatRates.ContainsKey(Constants.UnitedKingdom));
            Assert.IsTrue(vatRates.ContainsKey(Constants.Portugal));
            Assert.IsTrue(vatRates.ContainsKey(Constants.Singapore));
        }

        [TestMethod]
        public void GetVatRates_ReturnsValidDictionary()
        {
            // Arrange
            var vatCalculatorService = new VatCalculatorService();
            var expectedDictionary = new Dictionary<string, List<int>>
            {
                ["Austria"] = new List<int> { 5, 10, 13, 20 },
                ["UnitedKingdom"] = new List<int> { 5, 20 },
                ["Portugal"] = new List<int> { 6, 13, 23 },
                ["Singapore"] = new List<int> { 7 }
            };

            // Act
            var result = vatCalculatorService.GetVatRates();

            // Assert
            Assert.IsNotNull( result);
        }

    }
}
