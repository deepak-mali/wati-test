/**
 * @description - Function to add numbers provided in an array.
 * @param { Array<number> } numbers - Array of numbers.
 * @returns { number } - Return a number which can be integer or float.
 */
export const add = (numbers: Array<number>): number => {
	let sum = 0;
	numbers.map((num) => {
		num = Number(num);
		sum += num;
	});
	return sum;
};
