const router = require('express').Router();
const { Client, Exercise } = require('../../models');

router.get("/", (req, res) => {
    Client.findAll({
      include: [Exercise,]
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  });


  //CREATES Coach
router.post('/', async (req, res) => {
  try {
    const newClient = await Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      coach_id: req.body.coach_id
    });

    res.status(200).json(newClient);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: DELETE COACH

// TODO: EDIT COACH

module.exports = router;