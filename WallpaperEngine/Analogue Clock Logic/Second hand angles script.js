'use strict';
// for most of the other scripts I've done most of the work for but this one is taken right from the steam discussion page credited in the readme since it didn't need any changes.

/**
* Bind this script to the angles property of a layer for a simple 2D rotation.
*/

let rotationSpeed = 0.1;

/**
* @param {Vec3} value
*/
export function update(value) {
value.z = ((engine.timeOfDay * 1440) % 1) * -360;
return value;
}
