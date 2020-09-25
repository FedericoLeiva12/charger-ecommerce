const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js');

const DOMAIN = 'sandboxa23a4bcd74294927928cef787aee45fe.mailgun.org';
const mg = mailgun({apiKey: 'c6ef60a490abf34aca5f9fe7ec42fae2-cb3791c4-a74ef4bc', domain: 'sandboxa23a4bcd74294927928cef787aee45fe.mailgun.org'});

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
                }
            else {
                res(response);
            }
        });
    })
}
