var express = require('express');
var router = express.Router();
const vaccineService = require("../service/vaccineService")
const vaccineScheduler = require("../service/scheduler")

router.get('/', async function (req, res, next) {
    var allVaccineSlots = await vaccineService.getVaccineSlots(req.query.district_id, req.query.date);
    res.send(allVaccineSlots);
});

router.get('/18PlusSlots', async function (req, res, next) {
    var vaccineSlots = await vaccineService.get18PlusVaccineSlots(req.query.district_id, req.query.date);
    res.send(vaccineSlots);
});

router.get('/invokeScheduler', async function (req, res, next) {
   vaccineScheduler.invokeScheduler();
    res.send("Scheduler Invoked");
});


module.exports = router;
