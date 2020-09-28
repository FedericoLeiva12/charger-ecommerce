const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js');
const { domain } = require('process');

const DOMAIN = process.env.EMAIL_DOMAIN;
const mg = mailgun({apiKey: process.env.EMAIL_API_KEY, domain: domain});

module.exports = function sendEmail(data, vars) {
    return new Promise((res, rej) => {
        let content = fs.readFileSync(path.join(__dirname, data.content), 'utf-8');

        for(let [key, value] of Object.entries(vars)) {
            while(content.indexOf(`{${key}}`) !== -1) {
                content = content.replace(`{${key}}`, value);
            }
        }

        console.log(content)

        mg.messages().send({
            from: `Charger <${data.from}@${DOMAIN}>`,
            to: data.to,
            subject: data.subject,
            text: content,
            html: content
        }, (err, response) => {
            if(err) {
                rej(err);
                console.log(err)
                }
            else {
                res(response);
            }
        });
    })
}
