const express = require('express');
const routes = require('./controllers');
const cors = require('cors')
// const authConfig = require("../auth_config.json");
// const { expressjwt: jwt } = require("express-jwt");
// const jwksRsa = require("jwks-rsa");
const sequelize = require('./config/connection');




//GMS DO NOT MOVE APP.USE CORS OR EXPRESS FROM THEIR POSITIONING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// Force: is a method that resets dB information, true wipes it, false does not.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});
