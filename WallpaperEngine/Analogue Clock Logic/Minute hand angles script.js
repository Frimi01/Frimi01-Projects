'use strict';

export var scriptProperties = createScriptProperties()
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
let add = 0;
export function update(value) {
	if (scriptProperties.adjustmentOffset) {add = 180;}
	value.z = (((engine.timeOfDay * 24) % 1) * -360) + add;
	return value;
}
