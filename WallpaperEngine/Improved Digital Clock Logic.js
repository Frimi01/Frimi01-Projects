'use strict';
// Improved WallpaperEngine clock logic (how isn't this default??) https://github.com/Frimi01/Frimi01-Projects

export var scriptProperties = createScriptProperties()
	// Whether you want a 24h or 12h style format
	.addCheckbox({
		name: 'use24hFormat',
		label: 'ui_editor_properties_use_24h_format',
		value: true
	})
	// Whether you want to see the seconds or not
	.addCheckbox({
		name: 'showSeconds',
		label: 'ui_editor_properties_show_seconds',
		value: false
	})
	// This will be used to separate each element
	.addText({
		name: 'delimiter',
		label: 'ui_editor_properties_delimiter',
		value: ':'
	})
	// Changes the value based on the inserted diffrence in timezone
	.addText({
		name: 'timezoneAdjustment',
		label: 'timezone_adjustment',
		value: '+0'
	})
	// Adds 30 minutes if dealing with timezones that need it
	.addCheckbox({
		name: 'adjustmentOffset',
		label: 'has +30 Minutes',
		value: false
	})
	.finish();

/**
 * @param {String} value (for property 'text')
 */


export function update(value) {
	const timezoneAdjustment = parseInt(scriptProperties.timezoneAdjustment, 10) || 0;
	let time = new Date();
	
	// Adjust hours
	time.setHours(time.getHours() + timezoneAdjustment);

	// Adjust minutes if offset is enabled
	if (scriptProperties.adjustmentOffset) {
		time.setMinutes(time.getMinutes() + 30);
	}

	// Get updated hours and minutes
	let hours = time.getHours();
	let minutes = time.getMinutes();

	// Ensure 12-hour format if needed
	let amPm = '';
	if (!scriptProperties.use24hFormat) {
		amPm = hours >= 12 ? ' PM' : ' AM'; // Determine AM/PM
		hours = hours % 12 || 12; // Convert to 12-hour format
	}

	// Format values 
	hours = ("00" + hours).slice(-2);
	minutes = ("00" + minutes).slice(-2);

	value = hours + scriptProperties.delimiter + minutes;

	// Show seconds if enabled
	if (scriptProperties.showSeconds) {
		let seconds = ("00" + time.getSeconds()).slice(-2);
		value += scriptProperties.delimiter + seconds;
	}

	value += amPm; // Add AM/PM text if in 12-hour mode
	return value;
}

