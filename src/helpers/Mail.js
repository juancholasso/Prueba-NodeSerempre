const Queue = require('bee-queue');
const queue = new Queue('mails');
const nodemailer = require("nodemailer");

queue.process(async (job, done) => {
    console.log(`Processing job ${job.id}`);

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "juanpiscamo@gmail.com", // generated ethereal user
            pass: "lasuperclave", // generated ethereal password
        },
    });

    let info = transporter.sendMail({
        from: "Hola", // sender address
        to: job.data.to, // list of receivers
        subject: job.data.subject, // Subject line
        text: job.data.body, // plain text bodya
        html: "" // html body
    });

    console.log("Message sent: %s", info.messageId);

    return done(null, "OK");
});

const sendEmail = (email, subject, body)=>{
    const job = queue.createJob({to: email, "subject": subject, "body": body});
    job.save();
    job.on('succeeded', (result) => {
        console.log('Email sent');
    });
}

module.exports = {
    sendEmail
}
