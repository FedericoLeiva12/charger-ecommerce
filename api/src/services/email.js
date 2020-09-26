const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js');

const DOMAIN = 'sandboxbc776d77e90e4b16943a8e104e3aacbe.mailgun.org';
const mg = mailgun({apiKey: 'ebf4929ce866b33661666188b2ace957-cb3791c4-e17ea7ce', domain: 'sandboxbc776d77e90e4b16943a8e104e3aacbe.mailgun.org'});

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
