import countries from "world-countries";

const formattedCountries = countries.map((cntr) => ({
	value: cntr.cca2,
	label: cntr.name.common,
	flag: cntr.flag,
	latlng: cntr.latlng,
	region: cntr.region,
}));

const useCountries = () => {
	const getAll = () => formattedCountries;
	console.log(formattedCountries);

	const getByValue = (value: string) =>
		formattedCountries.find((cntr) => value === cntr.value);

	return { getAll, getByValue };
};

export default useCountries;
