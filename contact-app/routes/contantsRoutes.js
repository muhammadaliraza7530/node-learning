import express from 'express';
import Contact from '../models/contact.js';

const routes = express.Router();

routes.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('home', { contacts });
  } catch (error) {
    console.error(error);
    res.render('home', { contacts: [] });
  }
});

routes.get('/show-contact/:id', async (req, res) => {
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

routes.get('/add-contact', (req, res) => {
  res.render('add-contact');
});

routes.post('/add-contact', async (req, res) => {
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

routes.get('/update-contact/:id', async (req, res) => {
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

routes.post('/update-contact/:id', async (req, res) => {
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

routes.get('/delete-contact/:id', async (req, res) => {
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

export default routes;