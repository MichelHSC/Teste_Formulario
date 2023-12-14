class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
        ];
    }

    // Iniciar a validação em todos os campos

    validate(form) {
        let inputs = form.getElementsByTagName("input");

        // Transforma uma HTMLCollection e um Array
        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {

            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);

                }
            }

        }, this);

    }

    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracters`;

        if (inputLength < minValue) {
            this.printMessage(input,errorMessage)
        }

    }

    printMessage(input, msg){
        let template = document.querySelector(".error-validation").cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove("template");

        inputParent.appendChild(template);

    }



}


const form = document.querySelector("#register-form");
const submit = document.querySelector("#btn-submit");

const validator = new Validator(); // Criar uma instância do Validator

// Evento que dispara as validações

submit.addEventListener("click", function (e) {

    e.preventDefault();

    validator.validate(form);
});