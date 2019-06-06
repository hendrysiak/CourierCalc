import Calculator from "/Calculator.js";
import Courier from "/Courier.js";
import CourierDHL from "/CourierDHL.js";

export default class System {
  constructor(e) {
    this.calc = new Calculator();
    this.btn = document.querySelector(".calculator");
    this.btn.addEventListener("click", this.renderProposal.bind(this));

    this.courierCompany = [];
    this.fetchingPrices();
  }
  fetchingPrices() {
    let api = 'https://gist.githubusercontent.com/hendrysiak/8beff81dfbc5ea65a8e5f92866bc7b25/raw/82ff40ed9139358fed5f8897a38cb18fbd6585a9/gistfile1.txt'

    fetch(api).then(resp => resp.json()).catch(error => console.log("Błąd pobierania danych z serwera", error)).then(data => data.forEach(price => this.courierCompany.push(price)))

  }

  renderProposal(e) {
    // this.fetchingPrices();
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