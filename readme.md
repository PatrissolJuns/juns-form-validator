# Author
PATRISSOL KENFACK #PatrissolJuns


[Github](https://github.com/PatrissolJuns) | [E-Mail](mailto:patrissolkenfack@gmail.com)


## About Juns Form Validator: JFV

JFV (Juns Frorm Validator) is a set of functions which provides for a website some usefully shortcuts to handle verification of HTML forms. 

It is very easy to use and setup.


## How to use JFV ?

Since JFV is build with javascript and jquery so you need to import jquery at least version 2.0.

So Just include `jfv.js`, `jfv.css` and `jquery.js`file.

Then you need to bind the class `jfv-form` to the form you which to check.

E.g: 

```html
<form class="jfv-form">

...

</form>
```

This validator use concept of jfv attributes. As you will see almost everything here will turn around jfv-attribute so let us start with the form.


### Form
 
If you want to perform an `ajax request` rather than normal request, you should edit your form tag as follows:

```html
<form class="jfv-form" jfv-ajax="true">

...

</form>
```

**Note:** By default the value of `jfv-ajax` is consider to `false` even thought it is omitted while defining the form tag.


### Input of type text

Let us see how JFV handles different type of validation


#### Min and max validation

If you want your input value to be between 3 and 10 characters for example, you just need to set `jfv-type="range"` to that input and then precise the value of the minimum and the value of 

the maximum this way`jfv-min="3"` and `jfv-max="10"`.

Example:

```html
<input type="text" jfv-type="range" jfv-min="3" jfv-max="10">
```

**Note:** Your not oblige to put the minimum and the maximum value. So may also put only one of them. 

#### Equal validation

If you want your input value to be equal to 5 characters, you just need to set `jfv-type="equal"` and `jfv-equal="5"` to that input.

Example:

```html
<input type="text" jfv-type="equal" jfv-equal="5">
```


#### Input of type password

The handling of password fields is a little bit different form the text fields one. Because here you have the possibility to bind the password confirm like so:

```html
<label for="password">Password:</label>

<input type="password" id="password" jfv-type="password" jfv-min="3" jfv-max="10">

<label for="password">Confirmation:</label>

<input type="password" jfv-type="password" jfv-ref="password">
```

By that way you can easily check if the two password are equals.

**Note:**: 

Here you must sure that the confirm password field `jfv-ref` the value of the `jfv-ref` property of the confirm password field is the id of the password field which is refer to.

Here you have to make sure that the field that has to confirm the password has the attribute `jfv-ref` and which is worth the id of the password concerned

By default, the program consider that the id of the password field is equal to "password".


#### Input of type email

Here there is nothing to setting because the email fields are automatically handle.


#### Number validation

Here we have 2 cases:

1- The attribute text of the input field is equal to `"number"`. In this case, there is nothing to configure. 

For example, if you want to have a price between 5 and 25, then do as follows:

```html
<input type="number" jfv-min="5" jfv-max="25">
```

2- The attribute text of the input field is equal to `"text"`. In this case, you should just defined `jfv-type="number"` and that is all. All others features remain valid so if you want for example to have a size between 1.55 and 2.1 meters, do it in the following way

```html
<input type="text" jfv-min="1.55" jfv-max="2.1">
```

### Textarea

There is nothing to set up here, that means all the others features are available. For example, to define a textarea that must contain at least 10 characters, 

it must be done as follows:

```html
<textarea jfv-type="range" jfv-min="10" > 
```

## Style

This system uses 7 classes css which allow it to make the syntactic coloring They are:

`.jfv-input-information:` Which allows to color the input in blue to signal a successful result during the verification.
Example:

[![jfv-input-information.png](https://i.postimg.cc/XJ7vZ935/jfv-input-information.png)](https://postimg.cc/QBwDw9FN)

`.jfv-input-invalid`: This allows to color the input in red to report an error during the verification.

Example:

[![jfv-input-invalid.png](https://i.postimg.cc/d0F2xNmK/jfv-input-invalid.png)](https://postimg.cc/SnZYXrvZ)

`.jfv-input-valid`: Which allows to color the input in green to report a success during the verification.

[![jfv-input-valid.png](https://i.postimg.cc/GmwG4gfs/jfv-input-valid.png)](https://postimg.cc/7f9fc9wx)

Theses classes below are only available when you have set `jfv-label` attribute for more information see this section below. They are:

`.jfv-label-information:` Which allows to color the label in blue to signal a successful result during the verification.
Example:

[![jfv-with-label-color.png](https://i.postimg.cc/X7Mk5vGJ/jfv-with-label-color.png)](https://postimg.cc/fkKdnDvn)

`.jfv-label-invalid`: This allows to color the label in red to report an error during the verification.
Example:

[![jfv-label-failed.png](https://i.postimg.cc/6q6zmWRR/jfv-label-failed.png)](https://postimg.cc/r0bSdLfF)

`.jfv-label-valid`: Which allows to color the label in green to report a success during the verification.

[![jfv-label-information.png](https://i.postimg.cc/ZnfjkGFQ/jfv-label-information.png)](https://postimg.cc/y3Z0crGh)

The last class is `.jfv-display-error-message` Which allows to display the error message at the bottom of the field.


### Error messages

For this version, the error messages will appear just below the corresponding fields and will have the class `jfv-display-error-message`. 

So it’s quite done possible to edit them as you wish.

Concerning the labels, if you want the labels to also take the color of the result of the verification, it will be enough to match the for of that label in attribute `jfv-label` of the input concerned.

In case your are not using label or there is no match label with that for attribute, The system will consider the value of `jfv-label` is the id of your "label" element. 

Example:

```html
<label for="nom_label">Nom : </label>
<input type="text" jfv-label="nom_label">
```

```html
<p id="nom_title">Nom : </p>
<input type="text" jfv-label="nom_title">
```

### Language

Also for this version, the error messages will be available in 2 languages: English and French.

### Others

If you have a field that does not need to be validated, but still want to have the syntactic color of the field validate, you can use `jfv-type="empty"`. 

it will be fair to say that the field is valid without any check on it.


#### Deactivation

If you do not want to check a field just add `jfv-validate="false"`to the correspondent field.

#### Field required

Sometimes, you may need to have a field that is required it means the field must have a value. To make it work, you should just set `jfv-type="required"`.


#### Optionality

If you want to make a field to be optional it means that the value must not be present but if there is any value it would be checked according to want you have setting for.

To make it work, you must set `jfv-optiona="true"`.


## Contributing

I will be very happy if you can contribute for this tool in order to build a more powerful verification system.

Do not hesitate to contact me at my email `patrissolkenfack@gmail.com`.

## License

JFV is an open source project under the [MIT license](https://opensource.org/licenses/MIT).
