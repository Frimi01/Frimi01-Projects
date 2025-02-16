'use strict';

export var scriptProperties = createScriptProperties()
	.addText({
		name: 'timezoneAdjustment',
		label: 'timezone_adjustment',
		value: '+0'
	})
	.addCheckbox({
		name: 'adjustmentOffset',
		label: 'has +30 Minutes',
		value: false
	})
	.finish();

/**
 * @param {Number} value - for property 'alpha'
 * @return {Number} - update current property value
 */

export function update() {
	//Get's the adjustment as a int and gets the time.
	const timezoneAdjustment = parseInt(scriptProperties.timezoneAdjustment, 10) || 0;
	let time = new Date();

	//Adjusts minutes and hours
	if (scriptProperties.adjustmentOffset) {
	time.setMinutes(time.getMinutes() + 30); 
	}
	time.setHours(time.getHours() + timezoneAdjustment);

	//returns am or pm in binary. (opasity doesn't recognice boolean when I tested it)
	return time.getHours() < 12 ? 1 : 0
}
