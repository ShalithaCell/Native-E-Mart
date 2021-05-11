const fs = require('fs');
const path = require('path');
const { siteLogo, accountConfirmationURL } = require('../../../config');
const mailService = require('../mailer/nodeMailer.service');

const emailNotificationService = {
    sendUserConfirmationEmail : async (userName, senderEmail, suffixData) =>
    {
        fs.readFile(path.resolve('public/email-confirm.html'), 'utf8', (err, data) =>
        {
            if (err)
            {
                // TODO: send telegram notification
                throw err;
            }

            const htmlBody = data.replace("{IMG}", siteLogo)
                .replace("{NAME}", userName)
                .replace("{LINK}", `${accountConfirmationURL}?email=${encodeURIComponent(suffixData.email)}&token=${encodeURIComponent(suffixData.token)}`);

            mailService.send(senderEmail, 'Confirm Your Native E Mart Account', htmlBody).then();
        });
    },
};

module.exports = emailNotificationService;
