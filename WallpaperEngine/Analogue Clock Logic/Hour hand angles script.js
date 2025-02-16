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
 * Bind this script to the angles property of a layer for a simple 2D rotation.
 */

let rotationSpeed = 0.1;



/**
 * @param {Vec3} value
 */
export function update(value) {
	let timezoneAdjustment = (parseInt(scriptProperties.timezoneAdjustment, 10) || 0)
	timezoneAdjustment *= 30;
	//Adds 30 minutes to hour hand
	if (scriptProperties.adjustmentOffset) {
		timezoneAdjustment += 15;
		}
	value.z = (engine.timeOfDay * -720) - timezoneAdjustment;
	return value;
}
