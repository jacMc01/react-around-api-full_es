const mongoose = require('mongoose');
const express = require('express');
const { URL } = require('url');
const bodyParser = require('body-parser');

const auth = require('./middleware/auth');


const { port = 3000 } = process.env;
const app = express();
const usersAPI = require('./routes/users');
const cardsAPI = require('./routes/cards');

const hostUrl = new URL(`http://localhost:${port}`);

console.log(hostUrl.href);


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// iniciar sesion y registro
const { login, createUser } = require('./controllers/users');
app.post('/signin', login);
app.post('/signup', createUser);

// agregar modulo de autenticacion
app.use(auth);



app.use('/users', usersAPI);
app.use('/cards', cardsAPI);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

const DB_URI = 'mongodb://127.0.0.1:27017/aroundb';

async function dbConnect() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      }
    );
    console.log('Database connection successful')
  } catch (err) {
    console.log(err);
  }
}

dbConnect();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

