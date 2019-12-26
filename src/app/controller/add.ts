export const add  = (numbers: Array<number>) => {
	let sum = 0;
	numbers.map((num) => {
		num = Number(num);
		sum += num;
	});
	return sum;
};
