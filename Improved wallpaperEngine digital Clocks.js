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
	.finish();

/**
 * @param {String} value (for property 'text')
 */


export function update(value) {
	const timezoneAdjustment = parseInt(scriptProperties.timezoneAdjustment, 10) || 0;
	let time = new Date();
	let hours = time.getHours() + timezoneAdjustment;

	// Ensure hours wrap around correctly
	hours = (hours + 24) % 24;

	let amPm = ''
	if (!scriptProperties.use24hFormat) {
		amPm = hours >= 12 ? ' PM' : ' AM'; // Determine AM/PM
		hours = hours % 12 || 12; // Convert to 12-hour format
	}

	hours = ("00" + hours).slice(-2);
	let minutes = ("00" + time.getMinutes()).slice(-2);
	value = hours + scriptProperties.delimiter + minutes;

	if (scriptProperties.showSeconds) {
		let seconds = ("00" + time.getSeconds()).slice(-2);
		value += scriptProperties.delimiter + seconds;
	}

	value += amPm; // Append AM/PM if in 12-hour mode
	return value;
}
