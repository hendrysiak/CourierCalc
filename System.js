import Calculator from "/Calculator.js";
import Courier from "/Courier.js";
import CourierDHL from "/CourierDHL.js";

export default class System {
  constructor(e) {
    this.calc = new Calculator();
    this.btn = document.querySelector(".calculator");
    this.btn.addEventListener("click", this.renderProposal.bind(this));
    this.courierCompany = [
      {
        name: "InPost",
        prices: [
          16.9, //5 kg
          19.9, //10 kg
          22.9, //20 kg
          24.9, //30 kg
          59.9, //40 kg
          69.9 //50 kg
        ],
        servicesPrices: [
          15, //custom
          2.5, //insurance
          2.5 //cod
        ],
        gaugeDivider: 6000
      },
      {
        name: "DHL",
        prices: [
          18.9, //5 kg
          24.9, //10 kg
          24.9, //20 kg
          29.9, //30 kg
          75 //drobnica, powyżej 31,5 kg
        ],
        servicesPrices: [
          30, //custom
          2.5, //insurance
          2.5 //cod
        ],
        gaugeDivider: 4000
      }
    ];
  }

  renderProposal(e) {
    console.log(this.calc.join);
    e.preventDefault();
    if (this.calc.join) {
      // render propozycji odbędzie się tylko wtedy, kiedy flaga validacji formularza będzie true

      const inpost = new Courier(
        this.courierCompany[0].name,
        this.calc.createPack(),
        this.calc.servicesInfo(),
        this.courierCompany[0].prices,
        this.courierCompany[0].servicesPrices,
        this.courierCompany[0].gaugeDivider
      );
      const dhl = new CourierDHL(
        this.courierCompany[1].name,
        this.calc.createPack(),
        this.calc.servicesInfo(),
        this.courierCompany[1].prices,
        this.courierCompany[1].servicesPrices,
        this.courierCompany[1].gaugeDivider
      );

      inpost.renderPrice();
      dhl.renderPrice();
    } else {
      alert("Popraw wagę lub wymiary!");
    }
    // console.log(courier.servicesPriceCalculator());
  }
}
