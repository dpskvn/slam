/**
* Removes an element from an array
* @param {Array} arr - The array to remove the element from
* @param {String} el - The element to be removed
*/

function removeElement(arr, el) {
  var index = arr.indexOf(el);
  if (index > -1) {
      arr.splice(index, 1);
  }
}

module.exports = removeElement;