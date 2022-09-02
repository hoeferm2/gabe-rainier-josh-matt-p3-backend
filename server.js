const express = require('express');
const routes = require('./controllers');
const cors = require('cors')
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.JAWSDB_URL || 3001;



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Force: is a method that resets dB information, true wipes it, false does not.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});
