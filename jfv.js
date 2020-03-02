/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 *                                                                         *
 * Welcome to the Juns Form Validator                                      *
 *                                                                         *
 * This is a little library to rapidly handle the validation of a form     *
 *                                                                         *
 * It provide many shortcut and attribute in order to let the developers   *
 *                                                                         *
 *  to focus on the essentials.                                            *
 *                                                                         *
 *                                                                         *
 *  by PatrissolJuns                                                       *
 *                                                                         *
 *  [GITHUB] https://github.com/PatrissolJuns/juns-form-validator          *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 *  Constant's list                                                        *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/**
 * Define the beginning of string template
 * @type {string}
 */
const MARQUEE_BEGIN = "${";

/**
 * Define the end of string template
 * @type {string}
 */
const MARQUEE_END = "}";

/**
 * List all CSS classes used by the library
 * @type {{input: [string, string, string], label: [string, string, string]}}
 */
const validationCLass = {
    input: ['jfv-input-valid', 'jfv-input-invalid', 'jfv-input-information'],
    label: ['jfv-label-valid', 'jfv-label-invalid', 'jfv-label-information']
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/



/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 * This function returns the list of all attributes of an element          *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
(function(old) {
    $.fn.attr = function() {
        if(arguments.length === 0) {
            if(this.length === 0) return null;

            let obj = {};
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

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/



/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 * This function with no argument returns the list of all jfv attributes   *
 *                                                                         *
 * of an element.                                                          *
 *                                                                         *
 * With one argument returns the value of the jfv element if exists.       *
 *                                                                         *
 *                                                                         *
 *  E.g: $('#my-input-text').jfv('min'); // return the value of the        *
 *                                                                         *
 *  attribute jfv-min                                                      *
 *                                                                         *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
(function(old) {
    $.fn.jfv = function() {
        
        if(this === undefined || this === null)
            return arguments.length === 0 ? [] : undefined;

        if(arguments.length === 0) {
            
            // First obtain an array which contains only a couple of jfv attribute and its value
            let jfvEntries = Object.entries(this[0].attributes)
                                .map(attr => [attr[1].name, attr[1].value])
                                .filter(a => /jfv/.test(a[0]));

            // Check if the array is empty
            if(jfvEntries.length === 0) return [];

            // Then map the obtained array to get an array with only the right attribute
            return jfvEntries.map(a => a[0].replace('jfv-', ''));
        }
        else if(arguments.length === 1) {
            // Create a regex composed with the argument
            let regex = new RegExp("jfv-"+arguments[0]);

            // Map the array of all attributes to get a new one with only attribute's name and value
            // Filter the obtained array to get only the jfv attribute and its value
            let result = Object.entries(this[0].attributes)
                                .map(attr => [attr[1].name, attr[1].value])
                                .filter(a => regex.test(a[0]));

            // Check if the argument has been found into jfv array
            if(result.length === 0) return undefined;

            // Return the value of the attribute
            return result[0][1];
        }

        return [];
    };
})($.fn.jfv);

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/


/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 * This is a JSON of Class. It is used to handle internationalisation,     *
 *                                                                         *
 * customization of error messages and many others things.                 *
 *                                                                         *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
const JFV = {
    /**
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                                                         *
     * This class handle the usage of an error like get the variable into it   *
     *                                                                         *
     * and so on.                                                              *
     *                                                                         *
     *  @param str: string Which represent the string to work on               *
     *                                                                         *
     *                                                                         *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     */
    Extractor: class {
        constructor(str) {
            this.str = str;
        }

        /**
         * Returns an array which content the list of variable into the string
         *
         * @return Array|undefined
         */
        get getParams () {
            let response = [], regex = /\${/, regex2 = /}/, BreakException = {};

            try {
                // Test if the str contains any variable
                if (regex.test(this.str)) {
                    // Then split the string by the marquee
                    this.str.split('${').slice(1).map(val => {
                        // Test if the variable is well formed and get it the true
                        if(regex2.test(val)) response.push(val.split('}')[0]);

                        // throw error
                        else throw BreakException;
                    });
                }
                return response;
            }
            catch (e) {
                if (e !== BreakException) throw e;
                else return undefined;
            }
        }

        /**
         * Check if a param exists into the error string
         *
         * @param param: String
         * @return Boolean|undefined
         */
        isExist (param) {
            // Get the list of all variable
            let paramsArray = this.getParams;

            // Check if the variable exists and return the results
            return paramsArray ? paramsArray.includes(param) : undefined;
        }

        /**
         * Set a value of a param into the error string
         *
         * @param param: string which is the param to be replaced
         * @param value: string which is the value to replace the param
         * @return JFV.Extractor object
         */
        setValue (param, value) {
            // Check if the param exists first
            if(this.isExist(param)) {
                // Get the string to find into the error string
                let strToFind = MARQUEE_BEGIN + param + MARQUEE_END;

                // Update the error string
                this.str = this.str.replace(strToFind, value);
            }
            return this;
        }

        /**
         * Return the error string
         *
         * @return string
         */
        get getValue () {
            return this.str;
        }

        /**
         * Reset the str value from a new one
         *
         * @param newString
         * @return JFV.Extractor object
         */
        reset(newString) {
            this.str = newString;

            return this;
        }

        /**
         * Check whether there is no left variable into the error string
         * it means all the variable have been parsed
         *
         * @return Boolean
         */
        isFullyParsed() {
            return !(new RegExp("\\" + MARQUEE_BEGIN, 'ig')).test(this.str)
                && !(new RegExp(MARQUEE_END, 'ig')).test(this.str);
        }
    },

    /**
     * This class handle the whole error messages
     *
     */
    ErrorMessage: class {
        // The json which is stored the error function
        static errorJSON = {
            "en-US": {
                "character": {
                    "equal": "Please enter exactly ${equalLength} character(s)",
                    "max": "Please enter at most ${maxLength} character(s)",
                    "min": "Please enter at least ${minLength} character(s)",
                },
                "email": "Please enter a valid email address",
                "number": {
                    "equal": "Please enter exactly the number ${equalLength}",
                    "max": "please enter a number lower than or equal than ${minLength}",
                    "min": "please enter a number greater than or equal than ${minLength}",
                    "number": "Please enter a number",
                    "range": "Please enter a number between ${minLength} and ${maxLength}",
                },
                "password": {
                    "confirmation": "Passwords must be the same"
                },
                "required": "This field is required",
            },
            "en-EN": {
                "character": {
                    "equal": "Please enter exactly ${equalLength} character(s)",
                    "max": "Please enter at most ${maxLength} character(s)",
                    "min": "Please enter at least ${minLength} character(s)",
                },
                "email": "Please enter a valid email address",
                "number": {
                    "equal": "Please enter exactly the number ${equalLength}",
                    "max": "please enter a number lower than or equal than ${minLength}",
                    "min": "please enter a number greater than or equal than ${minLength}",
                    "number": "Please enter a number",
                    "range": "Please enter a number between ${minLength} and ${maxLength}",
                },
                "password": {
                    "confirmation": "Passwords must be the same"
                },
                "required": "This field is required",
            },
            "fr-FR": {
                "character": {
                    "equal": "Veuillez entrer exactement ${equalLength} caractère(s)",
                    "max": "Veuillez saisir au plus ${maxLength} caractère(s)",
                    "min": "Veuillez saisir au moins ${minLength} caractère(s)",
                },
                "email": "Veillez saisir une adresse email valide",
                "number": {
                    "equal": "Veuillez saisir exactement le nombre ${equalLength}",
                    "max": "veuillez saisir un nombre inférieur ou égale à ${minLength}",
                    "min": "veuillez saisir un nombre supérieur ou égale à ${minLength}",
                    "number": "Veillez saisir un nombre",
                    "range": "Veuillez saisir un nombre compris entre ${minLength} et ${maxLength}",
                },
                "password": {
                    "confirmation": "Les mots de passe doivent être les mêmes"
                },
                "required": "Ce champ est requis",
            }
        };

        constructor() {
            // Get the language of the browser
            this.currentLanguage = navigator.language || navigator.userLanguage;

            const LanguageError = "Unknown language " + this.currentLanguage;

            try {
                // Test if the language is handle or not
                if(!Object.keys(this.constructor.errorJSON).includes(this.currentLanguage)) {
                    throw new Error(LanguageError);
                }
            }
            catch (e) {
                throw e;
            }

        }

        /**
         * Get a value of a key
         *
         * @param {string} key E.g: 'number', 'number.min', etc.
         */
        getValueOfKey(key) {
            let currentKey = key, // Copy the key parameter
                currentLanguageDictionary = this.constructor.errorJSON[this.currentLanguage], // Get the current language dictionary
                response = undefined; // Set the response undefined to handle all cases

            // The regex bellow match string like something or something.something n times
            const match = /^((\w+)\.)+\w+$|^(\w+)$/;

            // Check if the key is correct
            if(match.test(currentKey)) {

                // Since the key is correct then, update the response to the current language dictionary
                response = currentLanguageDictionary;

                while(currentKey !== '') {
                    // Get the index of the first dot
                    const indexOfFirstSeparator = currentKey.search(/\./);

                    // Check if the index is a correct one
                    if(indexOfFirstSeparator !== -1) {

                        const firstKey = currentKey.slice(0, indexOfFirstSeparator), // Get the first key onto the string
                            restOfKey = currentKey.slice(indexOfFirstSeparator + 1); // Get the rest of the key

                        // Try to get the current property
                        try {
                            // Get the content of the first key according to the current language dictionary
                            response = currentLanguageDictionary[firstKey];
                        }
                        catch (e) {
                            // Else return the previous property value
                            return response;
                        }

                        // Update the current language dictionary so that the next lap will be according to it
                        currentLanguageDictionary = response;

                        currentKey = restOfKey; // update the current key
                    }

                    // It means the string does not anymore contains a dot
                    else {
                        response = response[currentKey]; // Get the value of the key
                        currentKey = ''; // Set the key to stop the loop
                    }
                }
            }

            return response;
        }


        /**
         * Define the language in cas where the user does not wants to use the default language
         *
         * @param language
         * @returns {JFV.ErrorMessage}
         */
        setLanguage(language) {
            const LanguageError = "Unknown language " + language;

            try {
                // Test if the language is handle or not
                if(Object.keys(this.constructor.errorJSON).includes(language)) {
                    this.currentLanguage = language;
                }
                else throw new Error(LanguageError);
            }
            catch (e) {
                throw e;
            }

            return this;
        }


    },

    DomTool: class {
        constructor() {}

        static TABLE_OF_256_HEXADECIMAL = (function () {
            const arr = [];
            for (let i = 0; i < 256; i++) { arr[i] = (i < 16 ? '0': '') + (i).toString(16); }
            return arr;
        })();

        static getUniqueId() {
            const d0 = Math.random()*0xffffffff|0;
            const d1 = Math.random()*0xffffffff|0;
            const d2 = Math.random()*0xffffffff|0;
            const d3 = Math.random()*0xffffffff|0;
            return this.TABLE_OF_256_HEXADECIMAL[d0&0xff]+this.TABLE_OF_256_HEXADECIMAL[d0>>8&0xff]+this.TABLE_OF_256_HEXADECIMAL[d0>>16&0xff]+this.TABLE_OF_256_HEXADECIMAL[d0>>24&0xff]+'-'+
                this.TABLE_OF_256_HEXADECIMAL[d1&0xff]+this.TABLE_OF_256_HEXADECIMAL[d1>>8&0xff]+'-'+this.TABLE_OF_256_HEXADECIMAL[d1>>16&0x0f|0x40]+this.TABLE_OF_256_HEXADECIMAL[d1>>24&0xff]+'-'+
                this.TABLE_OF_256_HEXADECIMAL[d2&0x3f|0x80]+this.TABLE_OF_256_HEXADECIMAL[d2>>8&0xff]+'-'+this.TABLE_OF_256_HEXADECIMAL[d2>>16&0xff]+this.TABLE_OF_256_HEXADECIMAL[d2>>24&0xff]+
                this.TABLE_OF_256_HEXADECIMAL[d3&0xff]+this.TABLE_OF_256_HEXADECIMAL[d3>>8&0xff]+this.TABLE_OF_256_HEXADECIMAL[d3>>16&0xff]+this.TABLE_OF_256_HEXADECIMAL[d3>>24&0xff];
        }

        /**
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         *                                                                         *
         * This function with no argument returns the list of all jfv attributes   *
         *                                                                         *
         * of an element.                                                          *
         *                                                                         *
         * With one argument returns the value of the jfv element if exists.       *
         *                                                                         *
         *                                                                         *
         *  E.g: $('#my-input-text').jfv('min'); // return the value of the        *
         *                                                                         *
         *  attribute jfv-min                                                      *
         *                                                                         *
         *  @param {HTMLElement} element                                           *
         *  @param {string} attribute                                             *
         *                                                                         *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         */
        static jfv(element, attribute = '') {

            // Check if the element is a node
            if(element === undefined || element === null)
                return attribute === '' ? [] : undefined;

            if(attribute === '') {
                // First obtain an array which contains only a couple of jfv attribute and its value
                const jfvEntries = Object.entries(element.attributes)
                    .map(attr => [attr[1].name, attr[1].value])
                    .filter(a => /jfv/.test(a[0]));

                // if the array is empty then return an empty array
                // else map the obtained array to get an array with only the right attribute
                return jfvEntries.length === 0 ? [] : jfvEntries.map(a => a[0].replace('jfv-', ''));
            }

            // Create a regex composed with the argument
            const regex = new RegExp("jfv-" + attribute);

            // Map the array of all attributes to get a new one with only attribute's name and value
            // Filter the obtained array to get only the jfv attribute and its value
            const result = Object.entries(element.attributes)
                .map(attr => [attr[1].name, attr[1].value])
                .filter(a => regex.test(a[0]));

            // Return the value of the attribute or undefined if attribute has not been found into jfv array
            return result.length === 0 ? undefined : result[0][1];
        }

        static createErrorNode(element, errorMessage) {
            const newErrorNode = document.createElement("h6");
            newErrorNode.classList.add("jfv-error-message");
            newErrorNode.classList.add("jfv-display-error-message");
            newErrorNode.innerHTML = errorMessage;
            newErrorNode.setAttribute('jfv-id', jfv(element, 'id'));

            return newErrorNode;
        }

        static updateErrorMessage(element, errorMessage) {
            element.innerHTML = errorMessage;
        }

        static setJfvIdAttribute(element) {
            console.log(element);
            if(element.getAttribute('jfv-id') === null) {
                element.setAttribute('jfv-id', this.getUniqueId());
            }
        }
    },

    Validator: class {
        constructor() {}

        /*
         * The methods with {something}Checker is used to check a special parameter of an input
         *
         * @param {HTMLElement} element Element or input to test
         * @returns {*[]} Contains the validation state and the message. E.g: [false, "The age must be less than 150"]
         */

        /**
         * @param element
         * @returns {[boolean,string]}
         */
        static emptyChecker(element) {
            if (element.val().length > 510) return [false, `Please enter at most 510 character(s)`];
            else return [true, ""];
        }

        /**
         * @param element
         * @returns {[boolean,string]}
         */
        static emailChecker(element) {
            let regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i;

            return regex.test(element.val()) === true ? [true, ""] :
                [false, JFV_ERROR_MESSAGE.getValueOfKey('email')];
        }

        /**
         * This one handles required field
         *
         * @param element
         * @returns {[boolean,string]}
         */
        static requiredChecker(element) {
            /*if (element.val().length <= 0) return [false, JFV_ERROR_MESSAGE.getValueOfKey('required')];
            return [true, ""];*/
            return element.val().length <= 0
                ? [false, JFV_ERROR_MESSAGE.getValueOfKey('required')]
                : [true, ""];
        }

        /**
         * This one handles the checking of number
         *
         * @param element
         * @returns {[boolean,string]}
         */
        static numberChecker(element) {
            // Get the result of checking whether the value is a number of not
            let numberResult = /^[+-]?\d+(\.\d+)?$/.test(element.val()) ? [true, ""] : [false, JFV_ERROR_MESSAGE.getValueOfKey('number.number')];

            let rangeResult = [true, ""], // Initialize the rangeResult variable
                minLength = Number(element.jfv("min")), // Get the minimum value set
                maxLength = Number(element.jfv("max")); // Get the maximum value set

            // Get the parsed value of element in Number
            let length = Number(element.val());

            // Create the errorMessage variable to handle error message
            let errorMessage = new JFV.Extractor('');

            // Test if the
            if(minLength || maxLength) {

                if(minLength && maxLength)
                    rangeResult = (length >= minLength && length <= maxLength)
                        ? [true, ""]
                        : [
                            false,
                            errorMessage
                                .reset(JFV_ERROR_MESSAGE.getValueOfKey('number.range'))
                                .setValue('minLength', minLength)
                                .setValue('maxLength', maxLength)
                                .getValue
                        ];

                else if(minLength)
                    rangeResult = (length >= minLength)
                        ? [true, ""]
                        : [
                            false,
                            errorMessage
                                .reset(JFV_ERROR_MESSAGE.getValueOfKey('number.min'))
                                .setValue('minLength', minLength)
                                .getValue
                        ];

                else
                    rangeResult = (length <= maxLength)
                        ? [true, ""]
                        : [
                            false,
                            errorMessage
                                .reset(JFV_ERROR_MESSAGE.getValueOfKey('number.max'))
                                .setValue('maxLength', maxLength)
                                .getValue
                        ];

            }

            else {
                // Get the number that the value should be equal
                let equalLength = element.jfv("equal");

                if (equalLength) {
                    rangeResult = (length <= maxLength)
                        ? [true, ""]
                        : [
                            false,
                            errorMessage
                                .reset(JFV_ERROR_MESSAGE.getValueOfKey('number.equal'))
                                .setValue('equalLength', equalLength)
                                .getValue
                        ];
                }
            }

            // Return the error if the test was false
            // Note: We perform this check here because we want to show only one error message
            // no matters the different type of message that it can show
            if(!numberResult[0] && rangeResult[0])  return numberResult;
            else if(numberResult[0] && !rangeResult[0])  return rangeResult;
            else if(!numberResult[0] && !rangeResult[0])  return rangeResult;
            else return [true, ""];
        }

        /**
         * This one handles the confirmation of a password
         *
         * It means that it checks if a password field and its confirmation one are equals
         *
         * @param element
         * @returns {[boolean,string]}
         */
        static passwordConfirmationChecker(element){
            let password = $('#' + ( element.jfv("ref") ? element.jfv("ref") : 'password')) ;

            if(element.val() !== password.val()) return [false, JFV_ERROR_MESSAGE.getValueOfKey('password.confirmation')];
            else return [true, ""];
        }

        /**
         *
         * TODO: DELETE THIS FUNCTION
         * @param element
         * @returns {[boolean,string]}
         */
        static minMaxCheckerCharacter(element) {
            let length = Number(element.val().length);
            let minLength = Number(element.jfv("min"));
            let maxLength = Number(element.jfv("max"));
            let errorMessage = new JFV.Extractor('');

            if (length < minLength) return [
                false,
                errorMessage
                    .reset(JFV_ERROR_MESSAGE.getValueOfKey('character.min'))
                    .setValue('minLength', minLength)
                    .getValue
            ];
            else if (length > maxLength) return [
                false,
                errorMessage
                    .reset(JFV_ERROR_MESSAGE.getValueOfKey('character.max'))
                    .setValue('maxLength', maxLength)
                    .getValue
            ];
            else return [true, ""];
        }

        /**
         * @param element
         * @returns {[boolean,string]}
         */
        static phoneChecker(element) {
            let number_length = element.value.length;
            // let regex = /^(2|6)(5|6|7|8|9)[0-9]{7}$/ig;
            let regex = /^(2|6)[0-9]{8}$/ig;

            //Check the length of the number
            if($(element).jfv("optional") !== undefined && element.value === "") return [true, ""];
            else if(number_length < 9 || number_length > 9) return [false, "Le numéro doit avoir exactement 9 chiffres"];
            else if( !regex.test(element.value) ) return [false, "Veuillez entrer un numéro au format camerounais"];
            else return [true, ''];
        }


        /**
         * TODO: DELETE THIS FUNCTION
         *
         * @param element
         * @returns {[boolean,string]}
         */
        static equalChecker(element) {
            let length = Number(element.val().length);
            let equalLength = Number(element.jfv("equal")) ? Number(element.jfv("equal")) : 2;

            let errorMessage = new JFV.Extractor(JFV_ERROR_MESSAGE.getValueOfKey('character.max'));

            return length === equalLength
                ? [true, ""]
                : [
                    false,
                    errorMessage
                        .setValue('equalLength', equalLength)
                        .getValue
                ];
        }

    }
};


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/

const JFV_ERROR_MESSAGE = new JFV.ErrorMessage();


const JFV_DOM_TOOLS = JFV.DomTool;

const jfv = JFV_DOM_TOOLS.jfv;

const JFV_VALIDATOR = JFV.Validator;

/* ************** Validator Functions ************** */


/**
 * This function manages the coloration of valid indicator
 *
 * @param element
 */
function setValidIndicator(element) {
    element.removeClass(validationCLass.input[1], validationCLass.input[2]);
    element.addClass(validationCLass.input[0]);

    // check whether the input's label will be modified
    if(element.jfv("label")) {

        // Get the LABEL Element of the element
        let label = $("label[for="+ element.jfv("label") +"]");
        if(label.length <= 0) label = $('#' + element.jfv("label"));

        try
        {
            label.removeClass(validationCLass.label[1], validationCLass.label[2]);
            label.addClass(validationCLass.label[0]);
        } catch (e) {}
    }
}

/**
 * This function manages the coloration of invalid indicator
 *
 * @param element
 * @param errorMessage
 * @param isPasswordInput
 * @param isOnSubmit
 */
function setInvalidIndicator(element, errorMessage, isPasswordInput, isOnSubmit = false){
    // Color input in red or blue
    if(isOnSubmit) {

        element.removeClass(validationCLass.input[0], validationCLass.input[2]);
        element.addClass(validationCLass.input[1]);
    } else {

        element.removeClass(validationCLass.input[0], validationCLass.input[1]);
        element.addClass(validationCLass.input[2]);
    }

    // check whether the input's label will be modified
    if(element.jfv("label")) {
        try
        {
            // Get the LABEL Element of the element
            let label = $("label[for="+ element.jfv("label") +"]");
            if(label.length <= 0) label = $('#' + element.jfv("label"));

            // Set red or blue color on the input label if it exist
            if(isOnSubmit) {
                label.removeClass(validationCLass.label[0], validationCLass.label[2]);
                label.addClass(validationCLass.label[1]);
            } else {
                label.removeClass(validationCLass.label[0], validationCLass.label[1]);
                label.addClass(validationCLass.label[2]);
            }
        } catch (e) {}
    }

    // Display error message
    setInvalidErrorMessage(element[0], errorMessage, isOnSubmit, isPasswordInput);

    // Focus on invalid element
    element[0].scrollIntoView({block: "center", behavior: "smooth"})
}

/**
 * @param element
 * @param errorMessage
 * @param isOnSubmit
 * @param isPasswordInput
 */
function setInvalidErrorMessage(element, errorMessage, isOnSubmit, isPasswordInput) {

    if(hasErrorMessage(element)) {
        JFV_DOM_TOOLS.updateErrorMessage(element, errorMessage);
    }
    else {
        const newErrorNode = JFV_DOM_TOOLS.createErrorNode(element, errorMessage);

        insertAfter(newErrorNode, element, isPasswordInput);
    }


    /*if(isOnSubmit) {
        newErrorNode.classList.remove(validationCLass.label[2]);
        newErrorNode.classList.add(validationCLass.label[1]);
    }
    else {
        newErrorNode.classList.remove(validationCLass.label[1]);
        newErrorNode.classList.add(validationCLass.label[2]);
    }*/
}

function hasErrorMessage(element) {
   return document.querySelectorAll(`[jfv-id='${jfv(element, 'id')}']`).length === 2;
}

/**
 * Insert a node after another
 *
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
    $(".jfv-display-error-message").remove();
}


/**
 * Execute a function only once
 *
 * @param fn
 * @param context
 * @returns {function(): *}
 */
function once(fn, context) {
    // Variable to store the result of the first and only execution of the fn function
    let result;

    return function() {
        // Check if the function has been executed because if it is the case, the fn would be null
        if(fn) {
            result = fn.apply(context || this, arguments); // Execute the fn function
            fn = null; // Set the fn to null in order to no more execute it
        }

        // Return the result of the fn function
        return result;
    };
}

const blurEventOnInput = once(function (element) {
    element.on("blur", function() { removeErrorMessage(); });
});

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 * * * E  N  D  *  O F  *  V A L I D A T O R  *  F U N C T I O N S  * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/


/**
 * @param element
 * @returns {[boolean|string]}
 */
function secondTypeValidator(element) {
    let secondType = $(element).jfv("type");

    //if(secondType === 'phone') return phoneChecker(element);
    if(secondType === "required") return JFV_VALIDATOR.requiredChecker(element);
    else if(secondType === "empty") return JFV_VALIDATOR.emptyChecker(element);
    else if(secondType === "range") return JFV_VALIDATOR.minMaxCheckerCharacter(element);
    else if(secondType === "equal") return JFV_VALIDATOR.equalChecker(element);
    else if(secondType === "number") return JFV_VALIDATOR.numberChecker(element);
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
    let type = element.prop('type');
    let isPasswordInput = false;

    // remove previous message to avoid case like the input now is valid
    removeErrorMessage();

    // Call the blur effect in order to remove the error message on blur
    // Note: This this will be executed only once :)
    // blurEventOnInput(element);

    // Call of the different type of validation
    switch (element.prop('tagName')) {
        case 'INPUT':
            if(element.jfv("optional") && element.val() === "") object = [true, ""];
            else if(type === 'email') object = JFV_VALIDATOR.emailChecker(element);
            else if(type === 'number') object = JFV_VALIDATOR.numberChecker(element);

            // check for password input according to our password input behavior
            else if(element.jfv("type") && element.jfv("type") === 'password')
            {
                isPasswordInput = true;

                // Check if the input is the confirmation of password
                if(element.jfv("ref")) object = JFV_VALIDATOR.passwordConfirmationChecker(element);

                // Else apply the minMaxChecker in order to specify the length of the password
                else object = JFV_VALIDATOR.minMaxCheckerCharacter(element);
            }

            else if(type === 'text')
            {
                if(element.jfv("type"))
                    object = secondTypeValidator(element);
            }
            break;

        case 'TEXTAREA':
            if(element.jfv("type"))
                object = secondTypeValidator(element);
            break;

        case 'SELECT':
            object = [true, ""];
            break;

        default:
            object = [true, ""];
            break;
    }

    // Color the element and/or its label according to the value of object[0]
    object[0] === true
        ? setValidIndicator(element)
        : setInvalidIndicator(element, object[1], isPasswordInput, isOnSubmit);

    return object[0];

}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/



/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 * Validate a form i.e it will validate each items                         *
 *                                                                         *
 * @param form The form itself                                             *
 *                                                                         *
 * @param isOnSubmit This is the boolean to hire the global validation     *
 *                                                                         *
 * @returns {boolean}                                                      *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function validator(form, isOnSubmit = false) {
    let isValidArray = [];

    if(form.length > 0 && form.prop('tagName') === 'FORM') {
        let items = form.find('input, textarea');

        items.each(function (index) {
            let element = $(this);

            if(element.jfv('validate') !== 'false' && !element.jfv('validate')) {
                if(element.prop('type')
                    && element.prop('type') !== "hidden"
                    && element.prop('type') !== "file") {

                    // Set the jfv id
                    JFV_DOM_TOOLS.setJfvIdAttribute(element);

                    // Bind focus event to handle validation
                    element.on("focus", function() {
                        inputValidator(element);
                    });

                    // Add keyup event to increase the management of validation
                    element.on("keyup", function() {
                        inputValidator(element);
                    });

                    if(isOnSubmit) inputValidator(element, true) ?
                        isValidArray.push(true) :
                        isValidArray.push(false);
                }
            }
        });

        return isValidArray.every(a => a === true);
    }
}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/




/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                         *
 * Main function of the library JFV                                        *
 *                                                                         *
 * It initialize the JFV on each form of the page and also bind event      *
 *                                                                         *
 * watcher on them                                                         *
 *                                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function runValidator() {
    let isAjax = false;

    $(".jfv-form").each(function(index) {
        const form = $(this); // The form of the index lap

        // Start the validation of the form
        // And of course it will bind the event watcher to each input
        validator(form, false);

        // Check whether the form is going to be send through ajax or not
        if($(form).jfv("ajax") === "true") isAjax = true;

        form.on("submit", function(event) {
            event.preventDefault();

            // Check the form one last time before sending it or not
            // This is to be sur that all the inputs is good
            if(validator(form, true)) {
                // In case where the form is not going to be send through ajax, simply send the form
                if(!isAjax) event.currentTarget.submit();
            }
            // It means the form is not correct so cancel the the request
            else event.stopImmediatePropagation();
        });
    });
}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/



/**
 * Run the validator function
 */
runValidator();


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 *
 *
 *
 ** * * * * * * * * * *  E N D  *  O F  *  J F V   * * * * * * * * * * * * **
 *
 *
 *
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/
