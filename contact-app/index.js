import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Contact from './models/contact.js';
import contactsRoutes from './routes/contantsRoutes.js';
import { contactDB } from './config/database.js';
import express from 'express';


// Database connection
contactDB();

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
app.use('/', contactsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});