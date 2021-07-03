const router = require('express').Router()

const fs = require('fs');
const { Launch } = require('../models/launch');


router.get('/', async(req, res) => {
    const launches = await Launch.find({})
    res.render(
        'home', {
            launches: launches
        }
    )
})  
router.post('/', async (req, res) => {
	let data = fs.readFileSync('./data.json')
	let launch_data = JSON.parse(data)

	for (let i in launch_data){
		var duplicate = await Launch.findOne({ id: launch_data[i].id })
		if (duplicate){

			if (
				duplicate.id != launch_data[i].id ||
				duplicate.image.small != launch_data[i].links.patch.small ||
				duplicate.image.large != launch_data[i].links.patch.large ||
				duplicate.flight_no != launch_data[i].flight_number ||
				duplicate.name != launch_data[i].name ||
				duplicate.details != launch_data[i].details ||
				duplicate.date_utc != launch_data[i].date_utc
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
				console.log('Updated launch number: ' + duplicate.flight_no);
			}
		}
		else{
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

		}
	}

	res.redirect('/')
});

router.post('/search', async(req, res) => {
	let start = req.body.start
	let end = req.body.end
	

	const launch = await Launch.find({date_utc: {$gte: start, $lt: end}})
	for (let i in launch){
		console.log(launch[i].date_utc);
		
	}
	console.log(launch);

	res.render(
        'home', {
            launches: launch,
			return: true
        }
    )
})

module.exports = router