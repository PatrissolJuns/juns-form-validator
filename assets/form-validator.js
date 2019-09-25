/* ************** Validator Functions ************** */

/**
 * The functions with somethingChecker is used to check a special parameter of an input
 * @param element Element or input to test
 * @returns {*[]} Contains the validation state and the message. E.g: [false, "The age must be less than 150"]
 */

const validationCLass = {
    input: ['input-valid', 'input-invalid', 'input-information'],
    label: ['label-valid', 'label-invalid', 'label-information']
};

/*function dateChecker(element) {
    // let regex2 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    let date = element.val();

    // format date to the format dd-mm-yyy
    let regex2 = /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/;

    if(regex2.test(date)) {
        let date_splited = date.split('-');
        let day = date_splited[0];
        let month = date_splited[1];
        let year = date_splited[2];

        // day must be beetween 1 and 31
        // month like April, June, September, November must be 30 at most
        if( (day < 1 && day > 31) && ([4,6,9,11].includes(month) && day > 30) ) {
            return [false, "Jour invalide. Veillez saisir un jour compris entre 01 et le 31."];
        }
        // month must be beetween 1 and 12
        else if(month < 1 && month > 12) {
            return [false, "Mois invalide. Veillez saisir un mois compris entre 01 et le 12."];
        }
        // Heylo accpts at least 21 years old.
        else if(year > 1998) {
            return [false, "Désole vous devez avoir au moins 21 ans pour pourvoir vous enregistrer."];
        }
        // Test on Febuary
        else if(month == 2) {
            // if the year is a leap year (bissextille)
            if ( (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ){
                // then The month will have at most 29
                if( day > 29) {
                    return [false, "Jour invalide. Le jour doit être compris entre 01 et 29"];
                }
                else {
                    return [true, ""];
                }
            }
            // then The month will have at most 28
            else if(day > 28)
                return [false, "Jour invalide. Le jour doit être compris entre 01 et 28"];
            // everything is ok
            else return [true, ""];
        }
        // everything is ok
        else return [true, ""];
    }
    else return [false, "Veillez entrer un format valide SVP. JJ-MM-AAAA"];
}*/

/**
 * @param element
 * @returns {[boolean,string]}
 */
function emptyChecker(element) {
    if (element.length > 510) return [false, `Veillez entrer au plus 510 caractère(s)`];
    else return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function emailChecker(element) {
    // let match = value.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i);
    let regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i;

    return regex.test(element.value) === true ? [true, ""] :
        [false, "Veillez entrer une adresse mail valide"];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function phoneChecker(element) {
    let number_length = element.value.length;
    // let regex = /^(2|6)(5|6|7|8|9)[0-9]{7}$/ig;
    let regex = /^(2|6)[0-9]{8}$/ig;
    // let regex = /6[0-9]{8}/ig;

    //Check the length of the number
    if(element.dataset.hasOwnProperty("dirty") && element.value === "") return [true, ""];
    else if(number_length < 9 || number_length > 9) return [false, "Le numéro doit avoir exactement 9 chiffres"];
    else if(! regex.test(element.value) ) return [false, "Veillez entrer un numéro au format camerounais"];
    else return [true, ''];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function numberChecker(element){
    let min = element.min;
    let max = element.max;
    let integerResult = /\d/.test(element.value) ? [true, ""] : [false, "Veillez entrer un nombre"];
    let rangeResult = (Number(element.value) >= Number(min) && Number(element.value) <= Number(max)) ? [true, ""] : [false, `Veillez entrer un nombre entre ${min} et ${max}`];

    if(!integerResult[0] && rangeResult[0])  return integerResult;
    else if(integerResult[0] && !rangeResult[0])  return rangeResult;
    else return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function requiredChecker(element){
    if (element.value.length <= 0) return [false, 'Ce champ est obligatoire'];
    return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function minMaxChecker(element){
    let length = Number(element.value.length);
    let minLength = Number(element.dataset.hasOwnProperty("min")) ? Number(element.dataset.min) : 2;
    let maxLength = Number(element.dataset.hasOwnProperty("max")) ? Number(element.dataset.max) : 255;

    if (length < minLength) return [false, `Veillez entrer au moins ${minLength} caractère(s)`];
    else if (length > maxLength) return [false, `Veillez entrer au plus ${minLength} caractère(s)`];
    else return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function equalChecker(element){
    let length = Number(element.value.length);
    let equal = Number(element.dataset.hasOwnProperty("equal")) ? Number(element.dataset.equal) : 2;

    if (length !== equal) return [false, `Veillez entrer exactement ${equal} caractère(s)`];
    else return [true, ""];
}


/**
 * @param element
 * @returns {[boolean,string]}
 */
function passwordConfirmationChecker(element){
    let password = document.getElementById(element.dataset.hasOwnProperty("ref") ? element.dataset.ref : 'password');

    if(element.value !== password.value) return [false, "Le mot de passe doit être identique"];
    else return [true, ""];
}

/**
 * @param element
 */
function setValidIndicator(element){
    element.classList.remove(validationCLass.input[1]);
    element.classList.remove(validationCLass.input[2]);
    element.classList.add(validationCLass.input[0]);

    // check whether the input's label will be modified
    if(!element.dataset.hasOwnProperty("label") && element.dataset.label != "false") {
        try
        {
            element.parentElement.previousElementSibling.classList.remove(validationCLass.label[1]);
            element.parentElement.previousElementSibling.classList.remove(validationCLass.label[2]);
            element.parentElement.previousElementSibling.classList.add(validationCLass.label[0]);
        } catch (e) {}
    }
}

/**
 * @param element
 * @param errorMessage
 * @param isPasswordInput
 * @param isOnSubmit
 */
function setInvalidIndicator(element, errorMessage, isPasswordInput, isOnSubmit = false){
    // Color input in red or blue
    if(isOnSubmit) {
        element.classList.remove(validationCLass.input[2]);
        element.classList.remove(validationCLass.input[0]);
        element.classList.add(validationCLass.input[1]);
    } else {
        element.classList.remove(validationCLass.input[1]);
        element.classList.remove(validationCLass.input[0]);
        element.classList.add(validationCLass.input[2]);
    }

    // check whether the input's label will be modified
    if(!element.dataset.hasOwnProperty("label") && element.dataset.label != "false") {
        try
        {
            // Set red or blue color on the input label if it exist
            if(isOnSubmit) {
                element.parentElement.previousElementSibling.classList.remove(validationCLass.label[2]);
                element.parentElement.previousElementSibling.classList.remove(validationCLass.label[0]);
                element.parentElement.previousElementSibling.classList.add(validationCLass.label[1]);
            } else {
                element.parentElement.previousElementSibling.classList.remove(validationCLass.label[1]);
                element.parentElement.previousElementSibling.classList.remove(validationCLass.label[0]);
                element.parentElement.previousElementSibling.classList.add(validationCLass.label[2]);
            }
        } catch (e) {}
    }

    // Display error message
    setInvalidErrorMessage(element, errorMessage, isOnSubmit, isPasswordInput);

    // Focus on invalid element
    element.scrollIntoView({block: "center", behavior: "smooth"})
}

/**
 * @param element
 * @param errorMessage
 * @param isOnSubmit
 * @param isPasswordInput
 */
function setInvalidErrorMessage(element, errorMessage, isOnSubmit, isPasswordInput) {
    let newNode = document.createElement("h6");
    newNode.classList.add("displayErrorMessage");
    newNode.innerHTML = errorMessage;

    insertAfter(newNode, element, isPasswordInput);

    if(isOnSubmit) {
        newNode.classList.remove(validationCLass.label[2]);
        newNode.classList.add(validationCLass.label[1]);
    }
    else {
        newNode.classList.remove(validationCLass.label[1]);
        newNode.classList.add(validationCLass.label[2]);
    }
}

/**
 * @param el
 * @param referenceNode
 * @param isPasswordInput
 */
function insertAfter(el, referenceNode, isPasswordInput = false) {
    if(isPasswordInput) {
        el.classList.add('pl-pr-15');
        insertAfter(el, referenceNode.parentNode);
    }
    else referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

/**
 * Remove error message
 */
function removeErrorMessage() {
    while ($(".displayErrorMessage").length > 0) {
        try {
            $(".displayErrorMessage").remove();
        } catch (e) {
            console.log("error while removing");
        }
    }
}

/* ************** End of Validator Functions ************** */

/**
 * @param element
 * @returns {[boolean|string]}
 */
function secondTypeValidator(element) {
    let secondType = element.dataset.type;

    if(secondType === 'phone') return phoneChecker(element);
    else if(secondType === "required") return requiredChecker(element);
    else if(secondType === "empty") return emptyChecker(element);
    else if(secondType === "range") return minMaxChecker(element);
    else if(secondType === "equal") return equalChecker(element);
    else return [true, ""];
}

/**
 * This function validate an input of a form
 * @param element Input to validate
 * @param isOnSubmit
 * @returns {boolean}
 */
function inputValidator(element, isOnSubmit = false) {
    let object = [true, ""];
    let type = element.type;
    let isPasswordInput = false;

    // remove previous message to avoid case like the input now is valid
    removeErrorMessage();
    element.addEventListener("blur", function() { removeErrorMessage(); });

    // Call of the different type of validation
    if(element.tagName === 'INPUT')
    {
        if(type === 'email') object = emailChecker(element);
        else if(type === 'number') object = numberChecker(element);

        // check for password input according to our password input behavior
        else if(element.dataset.hasOwnProperty("type") && element.dataset.type === 'password')
        {
            isPasswordInput = true;
            if(element.name === 'password_confirmation') object = passwordConfirmationChecker(element);
            else object = minMaxChecker(element);
        }

        else if(type === 'text')
        {
            if(element.dataset.hasOwnProperty("type"))
                object = secondTypeValidator(element);
        }
    }
    else if(element.tagName === 'TEXTAREA')
    {
        if(element.dataset.hasOwnProperty("type"))
            object = secondTypeValidator(element);
    }
    else if(element.tagName === 'SELECT') object = [true, ""];
    else object = [true, ""];

    object[0] === true
        ? setValidIndicator(element)
        : setInvalidIndicator(element, object[1], isPasswordInput, isOnSubmit);

    return object[0];
}

/**
 * This function is used to validate a form i.e each it will validate each items
 * @param form The form itself
 * @param isOnSubmit This is the boolean to hire the global validation
 * @returns {boolean}
 */
function validator(form, isOnSubmit = false) {
    var isValidArray = [];

    if(form !== undefined && form.tagName === 'FORM') {
        var inputList = form.querySelectorAll('input, textarea');

        for (var input in inputList) {
            let element = inputList[input];

            if(element.dataset !== undefined){
                if(element.dataset.hasOwnProperty("validate")) {
                    // console.log("insidedd");
                    if(element.dataset.validate === 'true' && element.type !== "hidden" && element.type !== "file")
                    {
                        element.addEventListener("focus", function() {
                            inputValidator(element);
                        });
                        element.addEventListener("keyup", function() {
                            inputValidator(element);
                        });

                        if(isOnSubmit) inputValidator(element, true) ?
                            isValidArray.push(true) :
                            isValidArray.push(false);
                    }
                }
            }
        }

        return isValidArray.every(a => a == true);
    }
}

/**
 * Main function of the module formValidator
 */
function runValidator() {
    let forms = $(".form-validation");
    let isAjax = false;

    for (let form in Object.keys(forms).filter( a => /\d/.test(a) == true)) {
        validator(forms[form], false);
        if(forms[form].dataset.hasOwnProperty("ajax") && forms[form].dataset.ajax === "true") isAjax = true;
        forms[form].addEventListener("submit", function(event) {
            event.preventDefault();
            if(validator(forms[form], true)) {
                if(!isAjax) event.currentTarget.submit();
            }
            else event.stopImmediatePropagation();
        });
    }
}

/**
 * Run the validator function
 */
runValidator();

/*================== END OF FORM VALIDATOR ====================*/

