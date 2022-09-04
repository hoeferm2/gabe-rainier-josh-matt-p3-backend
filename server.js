const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const cors = require('cors')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// app.use(fileUpload());

// Force: is a method that resets dB information, true wipes it, false does not.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});
