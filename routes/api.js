const router = require('express').Router();
const fs = require('fs');

const { Launch, validate } = require('../models/launch');

router.get('/', async (req, res) => {
	fs.readFile('./overwrite.json', (err, data) => {
		if (err) throw err;
		let launch_data = JSON.parse(data);
		// console.log(launch[0].links);

		for (let i = 0; i < launch_data.length; i++) {
			var duplicate = Launch.findOne({ id: launch_data[i].id }, async (err, res) => {
				if (res) {
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
					console.log('Updated Launch ID: ' + launch_data[i].id);
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
					console.log('Launch ' + launch_data[i].name + ' saved!');
					console.log(i + 1 + '/' + launch_data.length);
				}
			});
		}

		console.log('Sync completed!');
	});
});

// router.get('/overwrite')

module.exports = router;
