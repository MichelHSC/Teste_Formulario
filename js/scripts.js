class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate'
        ];
    }

    // Iniciar a validação em todos os campos

    validate(form) {

        let currentValidations = document.querySelectorAll("form .error-validation")

        if (currentValidations.length > 0) {
            this.currentValidations(currentValidations);
        }

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
            this.printMessage(input, errorMessage)
        }

    }

    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracters`;

        if (inputLength < maxValue) {
            this.printMessage(input, errorMessage)
        }

    }

    emailvalidate(input){
        
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = "Insira um e-mail no padrão email@email.com";

        if(!re.test(email)){
            this.printMessage(input,errorMessage);
        }
    }
    


    printMessage(input, msg) {
        let errorQty = input.parentNode.querySelector(".error.validation")
        
        if(errorQty === null) {
            
        let template = document.querySelector(".error-validation").cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove("template");

        inputParent.appendChild(template);
        }

    }

    required(input){
        let inputValue = input.value;

        if(inputValue === ""){
            let errorMessage = "Este campo é Obrigatorio";

            this.printMessage(input, errorMessage);
        }
    }

    cleanValidations(validations){
        validations.forEach(el => el.remove());
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