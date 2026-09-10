import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Responsive 'Send, Json' method
app.get('/', (req, res) => {
  res.send({
    name: 'Muhmmad Ali Raza',
    email: 'muhmmadaliraza@example.com',
    age: 30
  });
});

// Responsive 'Redirect' method
app.get('/redirect', (req, res) => {
  res.redirect('https://gemini.google.com/app');
});

// Responsive 'render' method
app.get('/renderMethod', (req, res) => {
  res.render('render', { title: 'Responsive Render Method', message: 'Hello, this is a responsive render method!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});