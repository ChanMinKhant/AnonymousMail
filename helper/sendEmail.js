const nodemailer = require('nodemailer');
exports.sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${process.env.WEBSITE_NAME}" <${process.env.EMAIL_USERNAME}>`,
    to: process.env.MY_EMAIL,
    subject: process.env.SUBJECT || '',
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Received Message</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
    
          #container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
          }
    
          h2 {
            color: #333333;
          }
    
          p {
            font-size: 16px;
            color: #000000;
            line-height: 1.6;
            margin-bottom: 20px;
          }
    
          .message-box {
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 10px;
    
            background-color: #f9f9f9;
            margin-bottom: 20px;
          }
    
          a {
            color: #007bff;
            text-decoration: none;
          }
    
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div id="container">
          <h3>Anonymous Message!</h3>
          <div class="message-box">
            <p>${option?.message}</p>
          </div>
        </div>
      </body>
    </html>
    `,
  };
  await transporter.sendMail(mailOptions);
};
