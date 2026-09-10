import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import Contact from './models/contact.js';

// Database connection
mongoose.connect('mongodb://localhost:27017/contact-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('home', { contacts });
  } catch (error) {
    console.error(error);
    res.render('home', { contacts: [] });
  }
});

app.get('/show-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    res.render('show-contact', { contact });
  } catch (error) {
    console.error(error);
    res.status(404).send('Contact not found');
  }
});

app.get('/add-contact', (req, res) => {
  res.render('add-contact');
});

app.post('/add-contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body;

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      address,
    });

    res.render('show-contact', { contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).send('Unable to save contact');
  }
});

app.get('/update-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    res.render('update-contact', { contact });
  } catch (error) {
    console.error(error);
    res.status(404).send('Contact not found');
  }
});

app.post('/update-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    res.render('show-contact', { contact });
  } catch (error) {
    console.error(error);
    res.status(400).send('Unable to update contact');
  }
});

app.get('/delete-contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    res.render('delete-contact', { contact });
  } catch (error) {
    console.error(error);
    res.status(404).send('Contact not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});