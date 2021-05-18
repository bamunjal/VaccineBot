# VaccineBot
A bot that will keep checking for availability of vaccine for a locality and ping when available

# How To Use 

Update districtId,age limit and vaccine type you want to be notified for in _constants.js_ and run the scheduler with your choice of interval to get updates on vaccine availability.

Add your whatsapp number and "callmebot" api_key in .env, if you want to have whatsapp notifications.
WHATSAPP_API_KEY=
WHATSAPP_NUMBER=

*I'm adding the status to a file and reading it from a python code which updates my Raspberry Pi's LCD screen (Just for fun :))
Feel free to update the code to get notification in any form you want.*

Note : The code was writtern in 2 hours, so excuse any shortcuts taken.
Cheers !

Update log : 
Added Whatsapp notification to be sent whan a vaccine slot is available.
Service used to send whatsapp notification is : https://www.callmebot.com/blog/free-api-whatsapp-messages/
