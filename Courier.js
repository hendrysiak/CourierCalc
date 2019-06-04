export default class Courier {
    constructor(name, sizes, services, packPrices, servicesPricesOut, divider) {
        this.name = name;
        this.packDimensions = sizes;
        this.prices = packPrices;
        this.services = services;
        this.servicesPrices = servicesPricesOut;
        this.divider = divider;
    }
    weightCalculator() {
        let gauge = Math.round(
            (this.packDimensions[0] *
                this.packDimensions[1] *
                this.packDimensions[2]) /
            this.divider
        ); //waga gabarytowa

        if (gauge > this.packDimensions[3]) return gauge;
        else return this.packDimensions[3];
        // zwraca wagę wyższą - gabarytową, lub rzeczywistą
    }

    servicesPriceCalculator() {
        const that = this; //przypisuje this na stałe - wiązanie z obiektem
        // console.log(that)
        let valuePrice = 0;
        that.services.forEach((service, index) => {
            if (service) {
                valuePrice += that.servicesPrices[index]; // dodaje wszystkie koszta usług dodatkowych
            } else {
                valuePrice += 0;
            }
        });
        return valuePrice; // zwraca usługi - ich wartość
    }

    weightPrice() {
        let weight = this.weightCalculator(); // przyjmuje wagę do wyceny
        let weightSurcharge;
        if (weight > 50) {
            weightSurcharge = Math.round(weight - 50) * 3.69

            return weightSurcharge

        } else {
            return 0
        }
    }

    priceCalculator() {
        let weight = this.weightCalculator(); // przyjmuje wagę do wyceny


        let standardPrice = 0; // w zależności od wagi, dopisuje cenę z cennika
        if (weight <= 5) standardPrice = this.prices[0];
        else if (weight <= 10) standardPrice = this.prices[1];
        else if (weight <= 20) standardPrice = this.prices[2];
        else if (weight <= 30) standardPrice = this.prices[3];
        else if (weight <= 40) standardPrice = this.prices[4];
        else if (weight <= 50) standardPrice = this.prices[5];
        else if (weight > 50) standardPrice = this.prices[5] + this.weightPrice();

        return standardPrice + this.servicesPriceCalculator(); // zwraca cenę standardową wraz z doliczonymi usługami


    }

    renderPrice() {
        const prices = document.querySelector(".prices"); // system renderowania okienka z ceną
        const price = document.createElement("div");
        // if (prices.innerHTML != '') {
        //     prices.innerHTML = ``;
        // }

        price.innerHTML = `<h4>${this.name}</h4>
          <p><span>Cena netto:</span></p>
          ${(this.priceCalculator() / 1.23).toFixed(2)}
          <p><span>Cena brutto:</span></p>
          ${this.priceCalculator().toFixed(2)}`;
        prices.appendChild(price);
    }
}