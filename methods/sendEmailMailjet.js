
const Mailjet = require('node-mailjet')

// const mailjet = new Mailjet({
//     apiKey: "3b8ad8aad1c6e8a30780ee4516c9325e",
//     apiSecret: "5bc68f67311249f2166d3b3b8b7292ac"
//   });

const mailjet = new Mailjet({
    apiKey: "dc7ad3d5c430e8658be7f5616dc07287",
    apiSecret: "188779e4594e3967b5f6fa542122b40a"
  });


module.exports = function (email, callback) {

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'hiteshattri71@gmail.com',
                    Name: 'Hitesh Attri',
                },
                To: [
                    {
                        Email: email,
                        Name: 'You',
                    },
                ],
                Subject: 'My Mailjet Email!',
                TextPart: 'Greetings from Mailjet!',
                HTMLPart:
                    '<h3>Dear passenger 1, welcome to <a href="https://www.google.com/" target="_blank">google</a>!</h3><br />May the delivery force be with you!'
            }
        ]
    },
    request
        .then(result => {
            // console.log(result.body)
            callback(null,result.body);
        })
        .catch(err => {
            // console.log(err.statusCode)
            console.log(err);
            callback(err,null);
        })
    )
}

