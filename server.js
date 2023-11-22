require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sendEmail } = require('./helper/sendEmail');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/sent', async (req, res) => {
  const message = req.body.message;
  try {
    await sendEmail({ message });
  } catch (error) {
    res.render('error', { message: 'Message failed to send!' });
    return;
  }
  res.render('success', { message: 'Mail sent successfully!' });
});

app.all('*', (req, res) => {
  res.render('404');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
