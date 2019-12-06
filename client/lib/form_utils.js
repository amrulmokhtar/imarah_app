this.isValidEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    return false;
};

this.isValidPassword = function(value, min_length) {
	if(!value || value === "" || value.length < min_length)
		return false;
	return true;
};

this.timeToSeconds = function(timeStr, timeFormat) {
	var t = timeStr || "12:00 am";
	var tf = timeFormat || "h:mm a";
	var m = moment.utc("01/01/1970 " + t, "MM/DD/YYYY " + tf);
	if(!m.isValid()) {
		return null;
	}
	return m.unix();
};

this.secondsToTime = function(seconds, timeFormat) {
	var s = seconds || 0;
	var tf = timeFormat || "h:mm a";
	return moment.unix(s).utc().format(tf);
};

this.validateForm = function(formObject, validationCallback, errorCallback, submitCallback) {
	var values = {};
	var error = false;
	formObject.find("input,select,textarea").each(function() {
		var skipValue = false;
		var inputObject = $(this);
		var formGroup = inputObject.closest(".form-group");
		var fieldName = inputObject.attr("name");
		var labelObject = formGroup.find("label[for='" + fieldName + "']");
		var errorLabel = formGroup.find("#error-text");
		var fieldValue = inputObject.val();
		var dataType = inputObject.attr("data-type") ? inputObject.attr("data-type").toUpperCase() : "STRING";
		var dataFormat = inputObject.attr("data-format") || "";

		if(inputObject.attr("type") == "checkbox") {
			// auto set data type for checkbox
			if(!inputObject.attr("data-type")) {
				// single checkbox with that name means dataType="BOOL" else it is "ARRAY"
				if(formObject.find("input[name='" + fieldName + "']").length == 1) {
					dataType = "BOOL";
				}
				else {
					dataType = "ARRAY";
				}
			}

			if(dataType == "BOOL") fieldValue = inputObject.is(":checked");
			if(dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "";
		}

		// radio has value only if checked
		if(inputObject.attr("type") == "radio") {
			fieldValue = inputObject.is(":checked") ? fieldValue : "";
			if(dataType != "ARRAY" && !fieldValue) {
				skipValue = true;
			}
		}

		var minValue = inputObject.attr("data-min");
		var maxValue = inputObject.attr("data-max");
		var labelText = inputObject.attr("placeholder") ? inputObject.attr("placeholder") : "";
		if(!labelText) {
			labelText = labelObject ? labelObject.text() : fieldName;
		}

		// hide error message from previous call
		formGroup.removeClass("has-error");
		if(errorLabel) {
			errorLabel.text("");
		}

		function validationError(errorMessage) {
			formGroup.addClass("has-error");
			inputObject.focus();
			if(errorLabel) {
				errorLabel.text(errorMessage);
			}
			if(errorCallback) 
				errorCallback(errorMessage);
			error = true;
		}

		if(!skipValue) {
			// Check required
			if(inputObject.attr("required") && !fieldValue) {
				validationError(labelText + " is required");
				return false;
			}

			// Convert to bool
			if(dataType == "BOOL") {
				fieldValue = fieldValue ? true : false;
			}

			// Check Integer, also min and max value
			if(dataType == "INTEGER") {
				var intValue = parseInt(fieldValue);
				if(isNaN(intValue)) {
					validationError(labelText + ": Invalid value entered");
					return false;
				}

				if(minValue && !isNaN(parseInt(minValue)) && intValue < parseInt(minValue)) {
					validationError(labelText + " must be equal or greater than " + minValue);
					return false;
				}

				if(maxValue && !isNaN(parseInt(maxValue)) && intValue > parseInt(maxValue)) {
					validationError(labelText + " must be equal or less than " + maxValue);
					return false;
				}
				fieldValue = intValue;
			}

			// Check Float, also Min and Max value
			if(dataType == "FLOAT")
			{
				var floatValue = parseFloat(fieldValue);
				if(isNaN(floatValue)) {
					validationError(labelText + ": Invalid value entered");
					return false;
				}

				if(minValue && !isNaN(parseFloat(minValue)) && floatValue < parseFloat(minValue)) {
					validationError(labelText + " must be equal or greater than " + minValue);
					return false;
				}

				if(maxValue && !isNaN(parseFloat(maxValue)) && floatValue > parseFloat(maxValue)) {
					validationError(labelText + " must be equal or less than " + maxValue);
					return false;
				}
				fieldValue = floatValue;
			}

			// Check valid E-mail address
			if(dataType == "EMAIL") {
			    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			    if(!filter.test(fieldValue)) {
					validationError(labelText + ": please enter valid e-mail address");
					return false;
			    }
			}

			if(dataType == "ARRAY") {
				var newValue = values[fieldName] ? values[fieldName] : [];
				if(fieldValue) {
					newValue.push(fieldValue);
				}

				fieldValue = newValue;
			}

			// TIME (user input "12:30 am" produces "1800" that is number of seconds from midnight)
			if(dataType == "TIME") {
				if(fieldValue == "") {
					fieldValue = null;
				}
				var seconds = timeToSeconds(fieldValue, dataFormat);
				if(isNaN(parseInt(seconds))) {
					validationError(labelText + ": Invalid value entered.");
					return false;
				}
				fieldValue = seconds;
			}

			if(dataType == "DATE") {
				if(fieldValue == "") {
					fieldValue = null;
				} else {
					var date = moment(fieldValue, dataFormat);
					if(!date.isValid()) {
						validationError(labelText + ": Invalid value entered." + (dataFormat ? " Date is expected in format \"" + dataFormat + "\"" : ""));
						return false;
					}
					fieldValue = date.toDate();
				}
			}

			// Custom validation
			if(validationCallback) {
				var errorMessage = validationCallback(fieldName, fieldValue);
				if(errorMessage) {
					validationError(errorMessage);
					return false;
				}
			}

			values[fieldName] = fieldValue;
		}
	});

	if(error)
		return;

	values = deepen(values);

	if(submitCallback)
		submitCallback(values);
};

Handlebars.registerHelper("itemIsChecked", function(desiredValue, itemValue) {
	if(!desiredValue && !itemValue) return "";

	if(_.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "checked" : "";

	return desiredValue == itemValue ? "checked" : "";
});

Handlebars.registerHelper("optionIsSelected", function(desiredValue, itemValue) {
	if(!desiredValue && !itemValue) return "";

	if(_.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "selected" : "";

	return desiredValue == itemValue ? "selected" : "";
});

this.bootboxDialog = function(template, data, options) {
	var div = document.createElement("div");
	UI.insert(UI.renderWithData(template, data), div);
	options.message = div;
	bootbox.dialog(options);
};
