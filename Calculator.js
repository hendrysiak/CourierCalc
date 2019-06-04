export default class Calculator {
    constructor() {
        this.formSizes = document.querySelector(".formcalc");
        this.formServices = document.querySelector(".services");
        this.checkBox = document.querySelector('input[name="custom"]');
        this.danger = document.querySelector('.danger');
        this.sizes = [...this.formSizes.querySelectorAll("input")]; // wszystkie inputy wymiarowe i wagowy za pomocą spread wprowadzone do array
        this.sizes.forEach(size =>
            size.addEventListener("focusout", this.inputValueChecked.bind(this))
        );
        this.sizes.forEach(size =>
            size.addEventListener("change", this.inputValueChecked.bind(this))
        );
        this.services = this.formServices.querySelectorAll("input");
        this.join = false; // flaga do walidacji inputów wagowych i wymiarowych - przekazywana dalej!
        this.inputValueFlag = false; // flaga sprawdzająca każdego inputa z osobna
    }
    servicesInfo() {
        //zamiana wartości z services - zwraca załączone services
        const services = [];
        this.services.forEach(service => {
            if (service.type === "number") {
                // przekształca na true/false, jeśli wprowadzono wartość ubezpieczenia
                services.push(Boolean(service.value));
            } else if (service.type === "checkbox") {
                services.push(service.checked);
            }
        });
        return services; // zwraca załączone usługi
    }
    createPack() {
        const sizes = [];
        this.sizes.forEach(size => sizes.push(size.value * 1)); // pobiera wymiary z inputów i wprowadza jako tablicę

        return sizes; //zwraca wymiary
    }

    // Metoda do weryfikacji bieżącej inputa i jego wartości - w konstrukcji
    inputValueChecked(e) {
        if (!e.target.value || e.target.value > 200) {
            // sprawdza, czy nie pusty string i czy nie przekracza 200
            e.target.style.border = "2px solid red";
            this.inputValueFlag = false;
        } else {
            e.target.style.border = "";
            this.inputValueFlag = true;
        }
        if (this.sizes[3].value > 50) {
            // sprawdza, czy waga jest mniejsza od 50
            this.sizes[3].style.border = "2px solid red";
            this.inputValueFlag = false;
        } else {
            this.sizes[3].style.border = "";
            this.inputValueFlag = true;
        }
        if ((this.sizes[0].value > 120 || this.sizes[1].value > 120 || this.sizes[2].value > 120) || ((this.sizes[0].value + this.sizes[1].value + this.sizes[2].value) > 220) && !this.checkBox.checked) { // weryfikacja, czy któryś z wymiarów nie przekracza 120 cm, lub suma 220, a jeśli tak, to czy zaznaczono Niestandard
            this.inputValueFlag = false;
            this.danger.style.display = 'inline' // komunikat, o konieczności załączenia usługi niestandard
        } else {
            this.inputValueFlag = true;
            this.danger.style.display = 'none' // zamknięcie ostrzeżenia
        }

        let validator = this.sizes
            .filter(size => size.value != 0 && size.value != "" && size.value <= 200) // filtruje zawartości zgodne z wyznacznikami
            .map(size => Number(size.value)); // przerabia na number
        if (
            validator.length === this.sizes.length && // jeśli wszystkie wartości przeszły validację wstępną i weszły do tablicy
            this.inputValueFlag && // jeśli flaga validacji wartości jest true
            validator[0] + validator[1] + validator[2] <= 300 && // jeśli suma wymiarów jest mniejsza lub równa 300
            validator[3] <= 50 // jeśli waga jest mniejsza od 50
        ) {
            this.join = true; // uznaj dane za prawidłowe i zmień flagę validacji ogólnej
        } else {
            this.join = false; // w każdym, innym przypadku flaga validacji ogólnej powinna zostać false
        }
    }
};