import nodemailer from "nodemailer";
import express from "express";
import bodyParser from "body-parser";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "taufiklah87@gmail.com",
        pass: "qgdpywolwtwafzcq",
    },
});

const SENDMAIL = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.post('/email/send', (req, res) => {

    var nama = req.body.nama;
    var email = req.body.email;
    var paket = req.body.paket;
    var alamat = req.body.alamat;

    const message = "Hi there, you were emailed me through nodemailer"
    const options = {
        from: "TESTING <sender@gmail.com>", // sender address
        to: "taufiklah87@gmail.com", // receiver email
        subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
        text: nama,
        html: `<table>    <tr>        <td>Nama</td>        <td>Email</td>        <td>Paket</td>        <td>Alamat</td>    </tr>    <tr>        <td>${nama}</td>        <td>${email}</td>        <td>${paket}</td>        <td>${alamat}</td>    </tr></table>`,
    }

    SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
    });
    res.status(200);
});

app.listen(3000, (error) => {
    console.log("Jalan")
}
);
