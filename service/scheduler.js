'use strict';

const moment = require("moment");
const scheduler = require("node-schedule");
const vaccineService = require("./vaccineService");
const constants = require("../config/constants");
const notificationService = require("./notification");
const fs = require('fs');

const invokeScheduler = () => {
    if (scheduler.scheduledJobs["scheduler"]) {
        console.log("Job already running.Returning!");
        return "Job already running";
    }

    console.log('Scheduler invoked : ' + new Date());

    checkVaccineSlot();

    scheduler.scheduleJob("scheduler", constants.interval, function () {
        console.log('Jobs run : ' + new Date());
        checkVaccineSlot();
    });
}

const checkVaccineSlot = async () => {
    var slots = await vaccineService.get18PlusVaccineSlots(constants.districtId, moment(new Date()).format("DD-MM-YYYY"));

    var message = "";
    if (slots.length) {
        message = "Vaccine Slot(s) Available";
        console.log(message);
        notificationService.sendWhatsappNotification(process.env.WHATSAPP_NUMBER, message);
    } else {
        message = "Vaccine Slot Not Available";
        console.log(message);
    }

    // writing to file for python use
    writeToFile("message.txt", message);

}

const writeToFile = async (fileName, message) => {
    fs.writeFile(fileName, message, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = {
    invokeScheduler
}
