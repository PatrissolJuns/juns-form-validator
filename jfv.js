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

        static personalErrorMessages = [];

        // Get the language of the browser
        static currentLanguage = (() => {
            const currentLanguage = navigator.language || navigator.userLanguage;

            const LanguageError = "Unknown language " + currentLanguage;

            try {
                // Test if the language is handle or not
                if(!Object.keys(this.errorJSON).includes(currentLanguage)) {
                    throw new Error(LanguageError);
                }
                return currentLanguage;
            }
            catch (e) {
                throw e;
            }
        })();

        /**
         * Get a value of a key
         *
         * @param {string} key E.g: 'number', 'number.min', etc.
         * @param element
         */
        static getValueOfKey(key, element = null) {
            const isElementPresent = element && this.isFieldPresent(element.id);
            // Get the current language dictionary
            let currentLanguageDictionary = isElementPresent ? this.getFieldMessagesWithLanguage(element.id) : this.errorJSON[this.currentLanguage];

            const result = this.getValueOfKeyFromLanguageDictionary(key, currentLanguageDictionary, element);

            if(isElementPresent && result === undefined) {
                return this.getValueOfKeyFromLanguageDictionary(key, this.errorJSON[this.currentLanguage], element);
            }

            return result;
        }

        /**
         * Get a value of a key
         *
         * @param {string} key E.g: 'number', 'number.min', etc.
         * @param languageDictionary
         * @param element
         */
        static getValueOfKeyFromLanguageDictionary(key, languageDictionary, element = null) {
            let currentKey = key, // Copy the key parameter
                currentLanguageDictionary = languageDictionary, // Get the current language dictionary
                response = []; // Set the response undefined to handle all cases

            if(element) console.log("currentLanguageDictionary ==> ",currentLanguageDictionary);

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

                            // For case where the object does have the key
                            if(response === undefined) {
                                return response;
                            }
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
        static setLanguage(language) {
            const LanguageError = "Unknown language " + language;

            try {
                // Test if the language is handle or not
                if(Object.keys(this.errorJSON).includes(language)) {
                    this.currentLanguage = language;
                }
                else throw new Error(LanguageError);
            }
            catch (e) {
                throw e;
            }

            return this;
        }

        static FormAPI = class {
            form = '';
            constructor(FormObject) {
                this.form = FormObject;
                this.element = document.getElementById(this.form.formId);
            }

            getFields() {
                return this.form.fields.map(f => f.id);
            }

            getFieldById(id) {
                return this.form.fields.find(f => f.id === id);
            }

            isInputPresent(id) {
                if(!id) return false;
                return this.getFields().includes(id);
            }
        }

        static isFieldPresent(id) {
            return this.personalErrorMessages
                        .some(f => (new this.FormAPI(f)).isInputPresent(id));
        }

        static getField(id) {
            if(this.isFieldPresent(id)) {
                for(const form of this.personalErrorMessages) {
                    const formAPI = new this.FormAPI(form);
                    const result = formAPI.getFieldById(id);
                    if(result) return result;
                }
            }
            return false;
        }

        static getFieldMessages(id) {
            if(this.isFieldPresent(id)) {
                return this.getField(id).messages;
            }
            return null;
        }

        static getFieldMessagesWithLanguage(id) {
            const messages = this.getFieldMessages(id);
            if(messages) {
                if(messages.hasOwnProperty(this.currentLanguage)) {
                    return messages[this.currentLanguage];
                }
                // Fallback language
                else if(messages.hasOwnProperty('en-US')){
                    return messages['en-US'];
                }
                else {
                    return messages;
                }
            }
        }

    },

    DomTool: class {
        constructor() {}

        static TABLE_OF_256_HEXADECIMAL = (function () {
            const arr = [];
            for (let i = 0; i < 256; i++) { arr[i] = (i < 16 ? '0': '') + (i).toString(16); }
            return arr;
        })();

        /**
         * Generate an unique id
         *
         * From StackOverFlow https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
         *
         * @returns {string}
         */
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
         *  @param {Element} element                                           *
         *  @param {string} attribute                                             *
         *  @return {Array|string|undefined}                                                                       *
         *                                                                         *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         */
        static jfv(element, attribute = '') {

            // Check if the element is a node
            if(element === undefined || element === null)
                return attribute === '' ? [] : undefined;

            if(attribute === '') {
                // First obtain an array which contains only a couple of jfv attribute and its value
                const jfvEntries = Object.entries($(element)[0].attributes)
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
            const result = Object.entries($(element)[0].attributes)
                .map(attr => [attr[1].name, attr[1].value])
                .filter(a => regex.test(a[0]));

            // Return the value of the attribute or undefined if attribute has not been found into jfv array
            return result.length === 0 ? undefined : result[0][1];
        }

        /**
         * Check if an HTMLElement has a bound error HTMLElement
         * @param element
         * @returns {boolean}
         */
        static hasErrorMessage(element) {
            return document.querySelectorAll(`[jfv-id='${jfv(element, 'id')}']`).length === 2;
        }

        /**
         * Generate a new HTMLElement and set its jfv-id attribute
         *
         * @param {HTMLElement} element
         * @param {string} errorMessage
         * @returns {HTMLHeadingElement}
         */
        static createErrorNode(element, errorMessage) {
            const newErrorNode = document.createElement("h6");
            newErrorNode.classList.add("jfv-error-message");
            newErrorNode.classList.add("jfv-display-error-message");
            newErrorNode.innerHTML = errorMessage;
            newErrorNode.setAttribute('jfv-id', jfv(element, 'id'));

            return newErrorNode;
        }

        static updateErrorMessage(element, errorMessage) {
            const boundErrorHtmlElement = this.getErrorHtmlElement(element);
            if(boundErrorHtmlElement) {
                if(errorMessage !== '') {
                    boundErrorHtmlElement.innerHTML = errorMessage;
                }
                else this.removeErrorMessage(element);
            }
        }

        static removeErrorMessage(element) {
            const boundErrorHtmlElement = this.getErrorHtmlElement(element);
            if(boundErrorHtmlElement) boundErrorHtmlElement.remove();
        }

        static getErrorHtmlElement(element) {
            const result = document.querySelectorAll(`[jfv-id='${jfv(element, 'id')}']`);

            return result.length === 2 ? result[1] : null;
        }

        /**
         * Define the jfv-id attribute of an HTMLElement
         * @param {HTMLElement} element
         */
        static setJfvIdAttribute(element) {
            if(element.getAttribute('jfv-id') === null) {
                element.setAttribute('jfv-id', this.getUniqueId());
            }
        }

        static findFormAncestor (el) {
            let shouldStop = false;
            let node = null;
            while(shouldStop) {
                const parent = el.parentElement;
                if(parent.tagName === 'FORM'){
                    shouldStop = true;
                    node = parent;
                }
                else if(parent.tagName === 'BODY') shouldStop = true;
                else if(parent.tagName === 'HTML') shouldStop = true;
            }
            return node;
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
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static emptyChecker(element) {
            if (element.value.length > 510) return [false, `Please enter at most 510 character(s)`];
            else return [true, ""];
        }

        /**
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static emailChecker(element) {
            let regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i;

            return regex.test(element.value) === true ? [true, ""] :
                [false, JFV_ERROR_MESSAGE.getValueOfKey('email')];
        }

        /**
         * This one handles required field
         *
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static requiredChecker(element) {
            /*if (element.value.length <= 0) return [false, JFV_ERROR_MESSAGE.getValueOfKey('required')];
            return [true, ""];*/
            return element.value.length <= 0
                ? [false, JFV_ERROR_MESSAGE.getValueOfKey('required')]
                : [true, ""];
        }

        /**
         * This one handles the checking of number
         *
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static numberChecker(element) {
            // Get the result of checking whether the value is a number of not
            const numberResult = /^[+-]?\d+(\.\d+)?$/.test(element.value)
                                    ? [true, ""]
                                    : [false, JFV_ERROR_MESSAGE.getValueOfKey('number.number')];

            let rangeResult = [true, ""], // Initialize the rangeResult variable
                minLength = Number(jfv(element, "min")), // Get the minimum value set
                maxLength = Number(jfv(element, "max")); // Get the maximum value set

            // Get the parsed value of element in Number
            const length = Number(element.value);

            // Create the errorMessage variable to handle error message
            const errorMessage = new JFV.Extractor('');

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
                                .reset(JFV_ERROR_MESSAGE.getValueOfKey('number.min', element))
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
                let equalLength = jfv(element, "equal");

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
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static passwordConfirmationChecker(element){
            const password = document.getElementById(jfv(element, "ref")) ;

            if(!password) {
                console.error("An error occur: the value of jfv-ref attribute of confirmation password must be an valid id of a HTMLElement")
            }

            if(element.value !== password.value) return [false, JFV_ERROR_MESSAGE.getValueOfKey('password.confirmation')];
            else return [true, ""];
        }

        /**
         *
         * TODO: DELETE THIS FUNCTION
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static minMaxCheckerCharacter(element) {
            const length = Number(element.value.length);
            const minLength = Number(jfv(element, "min"));
            const maxLength = Number(jfv(element, "max"));
            const errorMessage = new JFV.Extractor('');

            if (length < minLength) return [
                false,
                errorMessage
                    .reset(JFV_ERROR_MESSAGE.getValueOfKey('character.min', element))
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
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static phoneChecker(element) {
            let number_length = element.value.length;
            // let regex = /^(2|6)(5|6|7|8|9)[0-9]{7}$/ig;
            let regex = /^(2|6)[0-9]{8}$/ig;

            //Check the length of the number
            if(jfv(element, "optional") !== undefined && element.value === "") return [true, ""];
            else if(number_length < 9 || number_length > 9) return [false, "Le numéro doit avoir exactement 9 chiffres"];
            else if( !regex.test(element.value) ) return [false, "Veuillez entrer un numéro au format camerounais"];
            else return [true, ''];
        }


        /**
         * TODO: DELETE THIS FUNCTION
         *
         * @param {HTMLElement} element
         * @returns {[boolean,string]}
         */
        static equalChecker(element) {
            let length = Number(element.value.length);
            let equalLength = Number(jfv(element, "equal")) ? Number(jfv(element, "equal")) : 2;

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

    },

    Personalize(FormArray) {
        JFV.ErrorMessage.personalErrorMessages = FormArray;
    }
};


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * *    E  N  D    * * * * * * * * * * * * * * * **
 *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/

const JFV_ERROR_MESSAGE = JFV.ErrorMessage;


const JFV_DOM_TOOLS = JFV.DomTool;

const jfv = JFV_DOM_TOOLS.jfv;

const JFV_VALIDATOR = JFV.Validator;

const JFV_EVENT_ITEM_ARR = {
    FOCUS: new Set(),
    KEYUP: new Set(),
};

/* ************** Validator Functions ************** */


/**
 * This function manages the coloration of valid indicator
 *
 * @param element
 */
function setValidIndicator(element) {

    JFV_DOM_TOOLS.removeErrorMessage(element[0]);

    element.removeClass(validationCLass.input[1], validationCLass.input[2]);
    element.addClass(validationCLass.input[0]);

    // check whether the input's label will be modified
    if(jfv(element, "label")) {

        // Get the LABEL Element of the element
        let label = $("label[for="+ jfv(element, "label") +"]");
        if(label.length <= 0) label = $('#' + jfv(element, "label"));

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
    if(jfv(element, "label")) {
        try
        {
            // Get the LABEL Element of the element
            let label = $("label[for="+ jfv(element, "label") +"]");
            if(label.length <= 0) label = $('#' + jfv(element, "label"));

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

    if(JFV_DOM_TOOLS.hasErrorMessage(element)) {
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

/*const blurEventOnInput = once(function (element) {
    element.on("blur", function() { removeErrorMessage(); });
});*/

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
    let secondType = jfv(element,"type");

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
 * @param {HTMLElement} element Input to validate
 * @param isOnSubmit
 * @returns {boolean}
 */
function inputValidator(element, isOnSubmit = false) {
    let object = [true, ""];
    let type = element.getAttribute('type');
    let isPasswordInput = false;

    // remove previous message to avoid case like the input now is valid
    // removeErrorMessage();

    // Call the blur effect in order to remove the error message on blur
    // Note: This this will be executed only once :)
    // blurEventOnInput(element);

    // Call of the different type of validation
    switch (element.tagName) {
        case 'INPUT':
            if(jfv(element, "optional") && element.value === "") object = [true, ""];
            else if(type === 'email') object = JFV_VALIDATOR.emailChecker(element);
            else if(type === 'number') object = JFV_VALIDATOR.numberChecker(element);

            // check for password input according to our password input behavior
            else if(jfv(element, "type") && jfv(element, "type") === 'password')
            {
                isPasswordInput = true;

                // Check if the input is the confirmation of password
                if(jfv(element, "ref")) object = JFV_VALIDATOR.passwordConfirmationChecker(element);

                // Else apply the minMaxChecker in order to specify the length of the password
                else object = JFV_VALIDATOR.minMaxCheckerCharacter(element);
            }

            else if(type === 'text')
            {
                if(jfv(element, "type"))
                    object = secondTypeValidator(element);
            }
            break;

        case 'TEXTAREA':
            if(jfv(element, "type"))
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
        ? setValidIndicator($(element))
        : setInvalidIndicator($(element), object[1], isPasswordInput, isOnSubmit);

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

    if(form.length > 0 && form.tagName === 'FORM') {
        const items = form.querySelectorAll('input, textarea');

        for(const element of items.values()) {
            if(!jfv(element,'validate')) {
                if(element.getAttribute('type')
                    && element.getAttribute('type') !== "hidden"
                    && element.getAttribute('type') !== "file") {

                    // Set the jfv id
                    JFV_DOM_TOOLS.setJfvIdAttribute(element);

                    // Bind focus event to handle validation
                    // Check for older bound in order to have the handler only once
                    if(!JFV_EVENT_ITEM_ARR.FOCUS.has(jfv(element, 'id'))) {
                        element.addEventListener("focus", function() { inputValidator(element); });
                        JFV_EVENT_ITEM_ARR.FOCUS.add(jfv(element, 'id'));
                    }

                    // Add keyup event to increase the management of validation
                    // Check for older bound in order to have the handler only once
                    if(!JFV_EVENT_ITEM_ARR.KEYUP.has(jfv(element, 'id'))) {
                        element.addEventListener("keyup", function() { inputValidator(element); });
                        JFV_EVENT_ITEM_ARR.KEYUP.add(jfv(element, 'id'));
                    }

                    if(isOnSubmit) inputValidator(element, true) ?
                        isValidArray.push(true) :
                        isValidArray.push(false);
                }
            }
        }
        /*items.each(function (index) {
            let element = $(this);

            if(!jfv(element,'validate')) {
                if(element.prop('type')
                    && element.prop('type') !== "hidden"
                    && element.prop('type') !== "file") {

                    // Set the jfv id
                    JFV_DOM_TOOLS.setJfvIdAttribute(element);

                    // Bind focus event to handle validation
                    // Check for older bound in order to have the handler only once
                    if(!JFV_EVENT_ITEM_ARR.FOCUS.has(jfv(element[0], 'id'))) {
                        element.on("focus", function() { inputValidator(element[0]); });
                        JFV_EVENT_ITEM_ARR.FOCUS.add(jfv(element[0], 'id'));
                    }

                    // Add keyup event to increase the management of validation
                    // Check for older bound in order to have the handler only once
                    if(!JFV_EVENT_ITEM_ARR.KEYUP.has(jfv(element[0], 'id'))) {
                        element.on("keyup", function() { inputValidator(element[0]); });
                        JFV_EVENT_ITEM_ARR.KEYUP.add(jfv(element[0], 'id'));
                    }

                    if(isOnSubmit) inputValidator(element[0], true) ?
                        isValidArray.push(true) :
                        isValidArray.push(false);
                }
            }
        });*/

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

    // Get all the form to work on
    const forms = document.querySelectorAll('.jfv-form');

    for(const form of forms.values()) {
        // Apply the validator to each form in order to initialize the event listener
        validator(form, false);

        // Check whether the form is going to be send through ajax or not
        if(jfv(form, "ajax") === "true") isAjax = true;

        form.addEventListener("submit", function(event) {
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
    }
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

/*

JFV.Personalize([
      {
        formId: 'my-form',
        fields: [{
          id: 't1',
          messages: {
            'fr-FR': {
              character: {
                min: "Entrer au moins 2 charactères"
              }
            },
            'en-US': {
              character: {
                min: "Enter at least 3 characters"
              }
            }
          }
        }]
      }
    ]);

 */