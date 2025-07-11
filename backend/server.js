const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Farklı portlardan gelen istekleri kabul eder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  //kendi mail bilgilerim
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'turkdogan.selinn@gmail.com',    
      pass: 'tctvuarhazhcijvs',   // Gmail uygulama şifrem
    }
  });

  const mailOptions = {
    from: email,
    to: 'turkdogan.selinn@gmail.com',       
    subject: `Yeni mesaj: ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: 'Failed to send email.' });
    } else {
      console.log('Mail gönderildi: ' + info.response);
      return res.send({ success: true, message: 'Email send successfully.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
