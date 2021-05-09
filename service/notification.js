const axios = require('axios');
const constants = require('../config/constants');

const sendWhatsappNotification = async (phone,message) => {
    const params = {
        method: 'GET',
        url: `${constants.whatsapp_api}?phone=${phone}&text=${message}&apikey=${process.env.WHATSAPP_API_KEY}`,
      };

    return await axios(params).then((r) => {
        console.log(`Sent whatsapp notification to ${phone} with message : ${message}`);
        return r.data;
    }).catch((err) => {
        console.log(err)
        return err;
    });
}

module.exports = {
    sendWhatsappNotification
}
