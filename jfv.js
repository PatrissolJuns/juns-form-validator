/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 *                                                                         *
 * Welcome to the Juns Form Validator                                      *
 *                                                                         *
 * by PatrissolJuns                                                        *
 *                                                                         *
 *                                                                         *
 * This is a mini library to rapidly handle the validation of a form       *
 *                                                                         *
 * It provide many shortcut and attribute in order to function             *
 *                                                                         *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */


/* ************** Validator Functions ************** */

/**
 * The functions with somethingChecker is used to check a special parameter of an input
 *
 * @param element Element or input to test
 * @returns {*[]} Contains the validation state and the message. E.g: [false, "The age must be less than 150"]
 */

const validationCLass = {
    input: ['jfv-input-valid', 'jfv-input-invalid', 'jfv-input-information'],
    label: ['jfv-label-valid', 'jfv-label-invalid', 'jfv-label-information']
};

/**
 * This function returns the list of all attributes of an element
 */
(function(old) {
    $.fn.attr = function() {
        if(arguments.length === 0) {
            if(this.length === 0) {
                return null;
            }

            var obj = {};
            $.each(this[0].attributes, function() {
                if(this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attr);


/**
 * This function returns the list of all jfv attributes of an element
 */
(function(old) {
    $.fn.jfv = function() {
        console.log('arguments = ',arguments);
        if(arguments.length === 0) {
            console.log('sdqsdqs');
            // First obtain an array which contains only a couple of jfv attribute and its value
            let entries = Object.entries(this.attr()).filter(a => /jfv/.test(a[0]));

            let jfv_entries = entries.filter(a => /jfv/.test(a[0]));

            // Check if the array is empty
            if(jfv_entries.length === 0) return [];

            // Then map the obtained array to get an array with only the right attribute
            return jfv_entries.map(a => [a[0].replace('jfv-', ''), a[1]]);
        }
        else if(arguments.length === 1) {
            // Get the list of all jfv attributes
            let jfvAttributes = this.jfv();
            console.log('jfvAttributes = ',jfvAttributes);
            // Check if the list is not empty
            if(jfvAttributes.length > 0) {
                // Get the item of the array which contains the attribute argument
                let result = jfvAttributes.filter(a => a[0] === arguments[0]);

                if(result.length === 0) return undefined;

                // Return the value of the attribute
                return result[0][1];
            }
        }

        return [];
    };
})($.fn.jfv);

/**
 * This function is used to get the value of a jfv element
 *
 * E.g: $('#my-input-text').jfv('min'); // return the value of the attribute jfv-min
 */
/*(function(old) {
    $.fn.jfv = function(attribute) {
        if(arguments.length === 1) {
            // Get the list of all jfv attributes
            let jfvAttributes = this.jfv();
            console.log('jfvAttributes = ',jfvAttributes);
            // Check if the list is not empty
            if(jfvAttributes.length > 0) {
                // Get the item of the array which contains the attribute argument
                let result = jfvAttributes.filter(a => a[0] === attribute);

                if(result.length === 0) return undefined;

                // Return the value of the attribute
                return result[0][1];
            }
        }
        return undefined;
    };
})($.fn.jfv);*/


/**
 * @param element
 * @returns {[boolean,string]}
 */
function emptyChecker(element) {
    console.log("element.value.length = ",element.value.length);
    if (element.value.length > 510) return [false, `Veuillez entrer au plus 510 caractère(s)`];
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
        [false, "Veuillez entrer une adresse mail valide"];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function phoneChecker(element) {
    let number_length = element.value.length;
    // let regex = /^(2|6)(5|6|7|8|9)[0-9]{7}$/ig;
    let regex = /^(2|6)[0-9]{8}$/ig;

    //Check the length of the number
    if(element.dataset.hasOwnProperty("optional") && element.value === "") return [true, ""];
    else if(number_length < 9 || number_length > 9) return [false, "Le numéro doit avoir exactement 9 chiffres"];
    else if(! regex.test(element.value) ) return [false, "Veuillez entrer un numéro au format camerounais"];
    else return [true, ''];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function numberChecker(element) {
    let rangeResult = [true, ""];
    let integerResult = /^[+-]?\d+(\.\d+)?$/.test(element.value) ? [true, ""] : [false, "Veuillez entrer un nombre"];

    if(element.dataset.hasOwnProperty("min") || element.dataset.hasOwnProperty("max")) {
        let length = Number(element.value);
        let minLength = Number(element.dataset.hasOwnProperty("min")) ? Number(element.dataset.min) : 2;
        let maxLength = Number(element.dataset.hasOwnProperty("max")) ? Number(element.dataset.max) : 255;

        // rangeResult = (length >= minLength && length <= maxLength) ? [true, ""] : [false, `Veuillez entrer un nombre compris entre ${minLength} et ${maxLength}`];
        rangeResult = (length >= minLength && length <= maxLength) ? [true, ""] : [false, `Please enter a number between ${minLength} and ${maxLength}`];
    }
    else if (element.dataset.hasOwnProperty("equal")) {
        let length = Number(element.value);
        let equalLength = Number(element.dataset.hasOwnProperty("equal")) ? Number(element.dataset.equal) : 10;

        rangeResult = (length === equalLength) ? [true, ""] : [false, `Veuillez entrer exactement le nombre ${equalLength}`];
    }

    if(!integerResult[0] && rangeResult[0])  return integerResult;
    else if(integerResult[0] && !rangeResult[0])  return rangeResult;
    else if(!integerResult[0] && !rangeResult[0])  return rangeResult;
    else return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function requiredChecker(element) {
    if (element.value.length <= 0) return [false, 'Ce champ est obligatoire'];
    return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function minMaxChecker(element) {
    let length = Number(element.value.length);
    let minLength = Number(element.dataset.hasOwnProperty("min")) ? Number(element.dataset.min) : 2;
    let maxLength = Number(element.dataset.hasOwnProperty("max")) ? Number(element.dataset.max) : 255;

    if (length < minLength) return [false, `Veuillez entrer au moins ${minLength} caractère(s)`];
    else if (length > maxLength) return [false, `Veuillez entrer au plus ${minLength} caractère(s)`];
    else return [true, ""];
}

/**
 * @param element
 * @returns {[boolean,string]}
 */
function equalChecker(element) {
    let length = Number(element.value.length);
    let equal = Number(element.dataset.hasOwnProperty("equal")) ? Number(element.dataset.equal) : 2;

    return length === equal ? [true, ""] : [false, `Veuillez entrer exactement ${equal} caractère(s)`];
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
    if(element.dataset.hasOwnProperty("label")) {
        let label = document.getElementById(element.dataset.label);
        try
        {
            label.classList.remove(validationCLass.label[1]);
            label.classList.remove(validationCLass.label[2]);
            label.classList.add(validationCLass.label[0]);
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
    if(element.dataset.hasOwnProperty("label")) {
        try
        {
            let label = document.getElementById(element.dataset.label);
            // Set red or blue color on the input label if it exist
            if(isOnSubmit) {
                label.classList.remove(validationCLass.label[2]);
                label.classList.remove(validationCLass.label[0]);
                label.classList.add(validationCLass.label[1]);
            } else {
                label.classList.remove(validationCLass.label[1]);
                label.classList.remove(validationCLass.label[0]);
                label.classList.add(validationCLass.label[2]);
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
    newNode.classList.add("jfv-display-error-message");
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
        insertAfter(el, referenceNode.parentNode);
    }
    else referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

/**
 * Remove error message
 */
function removeErrorMessage() {
    while ($(".jfv-display-error-message").length > 0) {
        try {
            $(".jfv-display-error-message").remove();
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
    else if(secondType === "number") return numberChecker(element);
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
        if(element.dataset.hasOwnProperty("optional") && element.value === "") object = [true, ""];
        else if(type === 'email') object = emailChecker(element);
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
    let isValidArray = [];

    if(form !== undefined && form.tagName === 'FORM') {
        let inputList = form.querySelectorAll('input, textarea');

        for (let input in inputList) {
            let element = inputList[input];

            if(element.dataset !== undefined){
                if((element.dataset.hasOwnProperty("validate") && element.dataset.validate !== 'false')
                    || !element.dataset.hasOwnProperty("validate")) {

                    if(element.type !== "hidden" && element.type !== "file")
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

        return isValidArray.every(a => a === true);
    }
}

/**
 * Main function of the module formValidator
 */
function runValidator() {
    let forms = $(".jfv-form");
    let isAjax = false;

    // fetching the different forms
    for (let form in Object.keys(forms).filter( a => /\d/.test(a) === true)) {
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

/*================== END OF JFV FORM VALIDATOR ====================*/
