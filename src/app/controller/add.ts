
export const add  = (request, response) => {
	let sum = 0;
	request.body.numbers.map((num) => {
		num = Number(num);
		if (isNaN(NaN)) {
			sum += num;
		}
	});
	return response.status(200).json({
		sum,
	});
};
