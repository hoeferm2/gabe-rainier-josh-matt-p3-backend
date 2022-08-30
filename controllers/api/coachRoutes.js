const router = require('express').Router();
const { Client, Coach, } = require('../../models');

router.get("/", (req, res) => {
    Coach.findAll({
      include: [Client,]
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })


//CREATES Coach
router.post('/', async (req, res) => {
  try {
    const newCoach = await Coach.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newCoach);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;