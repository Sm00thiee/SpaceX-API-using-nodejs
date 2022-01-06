const router = require('express').Router()

const { Applicants } = require('../models/applicant');
const { Candidates } = require('../models/candidate');
const { Jobs } = require('../models/job');

// Get
router.get('/jobs', async (req, res) => {
	const jobs = await Jobs.find({_id: req.params._id})
	res.render(
		'home', {
		jobs: jobs
	}
	)
})

router.get('/candidates', async (req, res) => {
	const candidates = await Candidates.find({_id: req.params._id})
	res.render(
		'home', {
		candidates: candidates
	}
	)
})

router.get('/applicants', async (req, res) => {
	const applicants = await Applicants.find({_id: req.params._id})
	res.render(
		'home', {
		applicants: applicants
	}
	)
})

// Create mew
router.post('/jobs', async (req, res) => {
	const {discipline , specialties, job_type, salary} = req.body
	const discipline_enum = ['RN', 'LPN/LVN', 'Physical Therapist']
	if (
		discipline
	){

	}
	try
	{
		const num = await Jobs.find({}, async (mst, msg) => {
		const job = new Jobs({
			_id : msg.length,
			discipline: req.body.discipline,
			specialty_required: req.body.specialty_required,
			job_type: req.body.job_type,
			pay_amount: req.body.pay_amount
		})
		await job.save();
	})
	}
	catch
	{
		res.send("Not OK")
	}
	
	res.send("OK")
});

router.post('/candidates', async (req, res) => {
	const num = Candidates.find({}, async (mst, msg) => {
		const candidate = new Candidates({
			_id : msg.length,
			discipline: req.body.discipline,
			specialties: req.body.specialty_required,
			job_type: req.body.job_type,
			salary: req.body.pay_amount
		})
		await candidate.save()
	})

	res.send("OK")
	
});

router.post('/applicants', async (req, res) => {
	const num = Applicants.find({}, async (mst, msg) => {
		const applicant = new Applicants({
			_id : num.length,
			candidate_id: req.body.candidate_id,
			job_id: req.body.job_id
		})
		await applicant.save()
	})
	
});

// Update
router.put('/jobs', async (req, res) => {
	const job = await Jobs.findOneAndUpdate(
		{
			_id: req.params._id
		},
		{
			discipline: req.body.discipline,
			specialty_required: req.body.specialty_required,
			job_type: req.body.job_type,
			pay_amount: req.body.pay_amount
		})
});

router.put('/candidates', async (req, res) => {
	const candidate = await Candidates.findOneAndUpdate(
		{
			_id: req.params._id
		},
		{
			discipline: req.body.discipline,
			specialties: req.body.specialty_required,
			job_type: req.body.job_type,
			salary: req.body.pay_amount
		})
});

router.put('/applicants', async (req, res) => {
	const applicant = await Applicants.findOneAndUpdate(
		{
			_id: req.params._id
		},
		{
			candidate_id: candidate_id,
			job_id: req.body.candidate_id
		})
});

// Delete
router.delete('/jobs', async (req, res) => {
	const job = await Jobs.delete(
		{
			_id: req.params._id
		})
});

router.delete('/candidates', async (req, res) => {
	const candidate = await Candidates.delete(
		{
			_id: req.params._id
		})
});

router.delete('/applicants', async (req, res) => {
	const applicant = await Applicants.delete(
		{
			_id: req.params._id
		})
});


module.exports = router