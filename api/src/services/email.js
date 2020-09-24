const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js');

const DOMAIN = 'sandbox816ac05fe4e2419c909227270f83a5b0.mailgun.org';
const mg = mailgun({apiKey: '4b7ed811bad470873a468e81c3521c56-cb3791c4-c52142bf', domain: 'sandbox816ac05fe4e2419c909227270f83a5b0.mailgun.org'});

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
            from: `Changer <${data.from}@${DOMAIN}>`,
            to: data.to,
            subject: data.subject,
            text: content,
            html: content
        }, (err, response) => {
            if(err) {
                rej(err);
                }
            else {
                res(response);
            }
        });
    })
}