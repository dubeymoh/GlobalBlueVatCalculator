import { Component, OnInit } from '@angular/core';
import { VatService } from ".././services/vatservice.service";
import { ICountry } from '../models/country';
import { Amount } from '../helpers/amount';
import { IVatRate } from '../models/vatrate';
import { map, Observable, startWith } from "rxjs";
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PubSubService } from '../services/pubSubService';

@Component({
  selector: 'app-vatcalculator',
  templateUrl: './vatcalculator.component.html',
  styleUrls: ['./vatcalculator.component.css']
})

export class VatcalculatorComponent implements OnInit {

  //Duration for displaying error message in seconds
  errorDurationInSeconds = 2;

  //Control for search bar
  myControl = new FormControl('');

  //Flags to disable amount input fields
  disableNetAmt: boolean = false;
  disableGrossAmt: boolean = false;
  disableVatAmt: boolean = false;
  selectedAmt: string = '0';

  //Array of amount types
  AmtKeys: any = Object.values(Amount).filter(e => typeof (e) == "number");
  //Array of countries
  countries: ICountry[] = [];
  //Object containing VAT rates for each country
  vatRates: IVatRate = {
    rates: {}
  };
  //Observable to filter country options in the search bar
  filteredOptions: Observable<ICountry[]> = new Observable<ICountry[]>;

  selectedCountry: string = '';
  selectedVatRate: number = 0;
  netAmount: number = 0;
  grossAmount: number = 0;
  vatAmount: number = 0;
  applicableVatRates: number[] = [];


  constructor(private vatCalculationService: VatService, private pubsubService: PubSubService) { }

  /** Initialize component by subscribing to the country and VAT rates services and setting up
  filtered options for the country selection dropdown.*/
  ngOnInit(): void {
    this.vatCalculationService.getCountry().subscribe((result: any) => {
      this.countries = result;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    this.vatCalculationService.getVatRates().subscribe((result: any) => {
      this.vatRates.rates = result;
    });
    this.onAnmountTypeSelectionChange();
  }


  /** Method to handle click event on input textbox and update selectedAmt value*/
  onTextBoxClick(selectedRadio: number) {
    this.selectedAmt = selectedRadio.toString();
    this.onAnmountTypeSelectionChange();
  }

  /**
 * Handles the change event when the user enters a different amount type.
 * Updates the UI to enable/disable the input fields based on the entered amount type.
 */
  onAnmountTypeSelectionChange() {
    switch (parseInt(this.selectedAmt)) {
      case Amount.Gross:
        this.disableGrossAmt = false;
        this.disableNetAmt = true;
        this.disableVatAmt = true;
        break;
      case Amount.Net:
        this.disableGrossAmt = true;
        this.disableNetAmt = false;
        this.disableVatAmt = true;
        break;
      case Amount.Vat:
        this.disableGrossAmt = true;
        this.disableNetAmt = true;
        this.disableVatAmt = false;
        break;
      default:
    }
  }

  /**  This function filters the list of countries based on user input
      and returns a list of matching countries */
  private _filter(value: string): ICountry[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.countryName.toLowerCase().includes(filterValue));
  }

  /**  This function updates the applicable VAT rates based on the selected country*/
  onCountrySelection() {
    this.resetValues();
    this.updateVatRates();
  }

  /**  Get the applicable VAT rates based on the selected country*/
  updateVatRates() {
    this.applicableVatRates = this.getVatRatesByCountry(this.selectedCountry);
  }

  /**  This function gets the applicable VAT rates for the selected country from the VAT rates */
  getVatRatesByCountry(country: string): any {
    return this.vatRates.rates[country];
  }

  resetValues() {
    this.vatAmount = this.grossAmount = this.netAmount = this.selectedVatRate = 0;
  }

  /** This function is called when the user clicks on the Calculate button to calculate the VAT */
  calculateVatRate() {
    this.calculateAmounts();
  }

  /**
 * Calculates the Net Amount, Gross Amount, and VAT Amount based on the user's inputs.
 * Displays an error message if a required input field is missing or invalid.
 */
  calculateAmounts() {

    if (this.selectedCountry == '') {
      this.pubsubService.publishMessage('Please select a country.');
      return;
    }
    //Validate if VAT rate is selected
    if (this.selectedVatRate <= 0) {
      this.pubsubService.publishMessage('Please select a VAT rate.');
      return;
    }
    // calculate the NetAmount From GrossAmount
    if (parseInt(this.selectedAmt) == Amount.Gross) {
      this.calculateNetAmountFromGrossAmount();
    }
    // Calculate the GrossAmount From NetAmount
    if (parseInt(this.selectedAmt) == Amount.Net) {
      this.calculateGrossAmountFromNetAmount();
    }
    // Calculate the NetAmount From VatAmount
    if (parseInt(this.selectedAmt) == Amount.Vat) {
      this.calculateNetAmountFromVatAmount();
    }
  }

  /**
 * @param amount - The input string to validate.
 * @returns True if the input is invalid, false if the input is valid.
 */
  isInvalidAmount(amount: string) {
    var pattern = new RegExp(/^\d*\.?\d*$/);
    return !pattern.test(amount);
  }

  /** Calculate the GrossAmount From NetAmount*/
  calculateGrossAmountFromNetAmount() {
    if (this.notifyOnValidationError(this.netAmount, 'Invalid Price (without VAT).')) {
      this.grossAmount = this.vatAmount = 0;
      return;
    }
    this.vatAmount = this.netAmount * this.selectedVatRate / 100;
    this.grossAmount = parseInt(this.netAmount.toString()) + this.vatAmount;
  }

  /**calculate the NetAmount From GrossAmount*/
  calculateNetAmountFromGrossAmount() {
    if (this.notifyOnValidationError(this.grossAmount, 'Invalid Price (incl.VAT).')) {
      this.vatAmount = this.netAmount = 0;
      return;
    }
    this.netAmount = this.grossAmount * (1 - this.selectedVatRate / 100);
    this.vatAmount = parseInt(this.grossAmount.toString()) - this.netAmount;
  }

  /**Calculate the NetAmount From VatAmount*/
  calculateNetAmountFromVatAmount() {
    if (this.notifyOnValidationError(this.vatAmount, 'Invalid Value Added Tax(VAT) amount.')) {
      this.grossAmount = this.netAmount = 0;
      return;
    }
    this.grossAmount = this.vatAmount / this.selectedVatRate * 100;
    this.netAmount = parseInt(this.grossAmount.toString()) - this.vatAmount;
  }

  /**Call PubSubService's publishMessage method to display message' */
  private notifyOnValidationError(amount: number, message: string): boolean {
    if (this.isInvalidAmount(amount.toString()) || amount < 0 || amount.toString().trim() == '') {
      this.pubsubService.publishMessage(message);
      return true;
    }
    return false;
  }

}
