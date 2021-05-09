const axios = require('axios');
const constants = require('../config/constants');

const getVaccineSlots = async (districtId, date) => {
    const params = {
        method: 'GET',
        url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`,
        headers: {
            "accept": "*/*",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36/8mqPtVuL-9"
        },
    };

    return await axios(params).then((r) => {
        // console.log(r.data)
        return r.data;
    }).catch((err) => {
        console.log(err)
        return err;
    });
}


const get18PlusVaccineSlots = async (districtId, date) => {

    var allVaccineSlots = await getVaccineSlots(districtId, date);

    if (allVaccineSlots.centers) {
        return await allVaccineSlots.centers.filter((vaccineSlot => {
            var slot = vaccineSlot.sessions.find((session => session.min_age_limit <= constants.ageLimit && session.available_capacity > 0));
            if (slot)
                return slot;
        }));
    } else {
        return [];
    }
}

module.exports = {
    getVaccineSlots,
    get18PlusVaccineSlots
}