const router = require('express').Router();
const fs = require('fs')

const {Launch, validate} = require('../models/launch')

router.get('/', async (req, res) => {
	const read = new Promise (() => {fs.readFile('./data.json', (err, data) => {
		if (err) throw err;
		let launch_data = JSON.parse(data);
		// console.log(launch[0].links);

		for (let i = 0; i < launch_data.length; i++) {
			var duplicate = Launch.findOne({ id: launch_data[i].id }, async (err, res) => {
				if (res) {
					if (
						res.id != launch_data[i].id ||
						res.image.small != launch_data[i].links.patch.small ||
						res.image.large != launch_data[i].links.patch.large ||
						res.flight_no != launch_data[i].flight_number ||
						res.name != launch_data[i].name ||
						res.details != launch_data[i].details ||
						res.date_utc != launch_data[i].date_utc
					) {
						const launch = await Launch.updateOne(
							{
								id: launch_data[i].id
							},
							{
								$set: {
									'image.small': launch_data[i].links.patch.small,
									'image.large': launch_data[i].links.patch.large,
									flight_no: launch_data[i].flight_number,
									name: launch_data[i].name,
									details: launch_data[i].details,
									date_utc: launch_data[i].date_utc
								}
							}
						);
						console.log('Updated launch number: ' + launch_data[i].flight_no);
					}
				}
				else {
					const launch = new Launch({
						id: launch_data[i].id,
						'image.small': launch_data[i].links.patch.small,
						'image.large': launch_data[i].links.patch.large,
						flight_no: launch_data[i].flight_number,
						name: launch_data[i].name,
						details: launch_data[i].details,
						date_utc: launch_data[i].date_utc
					});
					const result = launch.save();
					console.log('Launch ' + launch_data[i].number + ' saved!');
					console.log(i + 1 + '/' + launch_data.length);
				}
			});
		}
		
	});
	console.log('Promise');
})
	console.log('Outside');
	// res.redirect('../')

	read.then(console.log('Outside 2'))
});


module.exports = router;
