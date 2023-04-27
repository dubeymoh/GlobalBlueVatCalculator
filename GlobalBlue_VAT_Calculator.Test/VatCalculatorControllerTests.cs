using GlobalBlue_VAT_Calculator.Interface;
using GlobalBlue_VAT_Calculator.Model;
using GlobalBlue_VAT_Calculator.Helper;
using GlobalBlue_VAT_Calculator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Http;

namespace GlobalBlue_VAT_Calculator.Tests
{
    [TestClass]
    public class VatCalculatorControllerTests
    {
        private VatCalculatorController _controller;
        private Mock<IVatCalculatorService> _serviceMock;

        [TestInitialize]
        public void Initialize()
        {
            _serviceMock = new Mock<IVatCalculatorService>();
            _controller = new VatCalculatorController(_serviceMock.Object);
        }

        [TestMethod]
        public void GetCountries_ReturnsOkResult()
        {
            // Arrange
            _serviceMock.Setup(x => x.GetCountries())
                .Returns(new List<Country>() {
                new Country{ CountryName = Constants.Austria },
                new Country{ CountryName = Constants.UnitedKingdom },
                new Country{ CountryName = Constants.Portugal },
                new Country{ CountryName = Constants.Singapore }});

            // Act
            var result = _controller.GetCountries();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetCountries_ReturnsCountries()
        {
            // Arrange
            var expectedCountries = new List<Country>() {
                new Country{ CountryName = Constants.Austria },
                new Country{ CountryName = Constants.UnitedKingdom },
                new Country{ CountryName = Constants.Portugal },
                new Country{ CountryName = Constants.Singapore }};

            _serviceMock.Setup(x => x.GetCountries())
                .Returns(expectedCountries);

            // Act
            var result = _controller.GetCountries() as OkObjectResult;
            var actualCountries =  result?.Value ;

            // Assert
            Assert.IsNotNull(actualCountries);
        }

        [TestMethod]
        public void GetCountries_ReturnsInternalServerError_WhenServiceThrowsException()
        {
            // Arrange
            _serviceMock.Setup(x => x.GetCountries())
                .Throws(new Exception());

            // Act
            var result = _controller.GetCountries() as ObjectResult;

            // Assert
            Assert.AreEqual(StatusCodes.Status500InternalServerError, result?.StatusCode);
        }

        [TestMethod]
        public void GetVatRates_ReturnsOkResult()
        {
            // Arrange
            var vatRates = new Dictionary<string, List<int>>
            {
             { "Country1", new List<int> { 10, 20, 30 } },
             { "Country2", new List<int> { 5, 15, 25 } },
             { "Country3", new List<int> { 8, 16, 24 } }
            };
            _serviceMock.Setup(x => x.GetVatRates()).Returns(vatRates);

            // Act
            var result = _controller.GetVatRates();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetVatRates_ReturnsVatRates()
        {
            // Arrange
            var vatRates = new Dictionary<string, List<int>>
            {
             { "Country1", new List<int> { 10, 20, 30 } },
             { "Country2", new List<int> { 5, 15, 25 } },
             { "Country3", new List<int> { 8, 16, 24 } }
            };
            _serviceMock.Setup(x => x.GetVatRates()).Returns(vatRates);

            // Act
            var result = _controller.GetVatRates() as OkObjectResult;
            var actualRates = result?.Value as Dictionary<string, List<int>>;

            // Assert
            CollectionAssert.AreEqual(vatRates, actualRates);
        }

        [TestMethod]
        public void GetVatRates_ReturnsInternalServerError_WhenServiceThrowsException()
        {
            // Arrange
            _serviceMock.Setup(x => x.GetVatRates())
                .Throws(new Exception());

            // Act
            var result = _controller.GetVatRates() as ObjectResult;

            // Assert
            Assert.AreEqual(StatusCodes.Status500InternalServerError, result?.StatusCode);
        }
    }
}



