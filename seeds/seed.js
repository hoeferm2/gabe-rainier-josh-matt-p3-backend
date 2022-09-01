const sequelize = require('../config/connection');
const { Coach,} = require('../models');

const coachSeedData = require('./coachSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const coaches = await Coach.bulkCreate(coachSeedData, {
    individualHooks: true,
    returning: true,
  });

  console.log(coaches)

  process.exit(0);
};

seedDatabase();