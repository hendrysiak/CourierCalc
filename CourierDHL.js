import Courier from "/Courier.js";

export default class CourierDHL extends Courier {
  weightPrice() {
    let weight = this.weightCalculator(); // przyjmuje wagę do wyceny
    let weightSurcharge;
    if (weight > 50 && weight < 110) {
      weightSurcharge = 15;

      return weightSurcharge;
    } else if (weight > 110) {
      weightSurcharge = 74.9;
      return weightSurcharge;
    }
  }

  priceCalculator() {
    let weight = this.weightCalculator(); // przyjmuje wagę do wyceny
    // let weight = 0; // przyjmuje wagę do wyceny

    let standardPrice = 0; // w zależności od wagi, dopisuje cenę z cennika
    if (weight <= 5 && this.packDimensions[3] <= 31.5)
      standardPrice = this.prices[0];
    else if (weight <= 10 && this.packDimensions[3] <= 31.5)
      standardPrice = this.prices[1];
    else if (weight <= 20 && this.packDimensions[3] <= 31.5)
      standardPrice = this.prices[2];
    else if (weight <= 31.5 && this.packDimensions[3] <= 31.5)
      standardPrice = this.prices[3];
    else if (weight > 50 && this.packDimensions[3] <= 31.5)
      standardPrice = this.prices[3] + this.weightPrice();
    else if (this.packDimensions[3] > 31.5) standardPrice = this.prices[4];

    return standardPrice + this.servicesPriceCalculator(); // zwraca cenę standardową wraz z doliczonymi usługami
  }
}
