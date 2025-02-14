export var scriptProperties = createScriptProperties()
	.addText({
		name: 'timezoneAdjustment',
		label: 'timezone_adjustment',
		value: '+0'
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
	const timezoneAdjustment = (parseInt(scriptProperties.timezoneAdjustment, 10) || 0) * 30
	value.z = (engine.timeOfDay * -720) - timezoneAdjustment;
	return value;
}
