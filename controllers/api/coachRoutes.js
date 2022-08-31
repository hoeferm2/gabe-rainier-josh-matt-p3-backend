const router = require('express').Router();
const { Client, Coach, } = require('../../models');

router.get("/", (req, res) => {
  Coach.findAll({
    // include: [Client]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "womp womp", err })
  })
})

//TODO: get Coach by id

router.get("/:username", async (req, res) => {
  try {
    const coachData = await Coach.findOne({
      where: {
        username: req.params.username
      }
    },
      {
        include: { model: Client },
      });

    if (!coachData) {
      res.status(404).json({ message: 'No Coach found with that email!' });
      return;
    }

    res.status(200).json(coachData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//CREATES Coach
router.post('/', async (req, res) => {
  try {
    const newCoach = await Coach.create({
      username: req.body.username,
      email: req.body.email,
      coach_code: req.body.coach_code
    });

    res.status(200).json(newCoach);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: DELETE COACH

router.delete('/:id', async (req, res) => {
  try {
    const deleteCoach = await Coach.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(deleteCoach);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updateCoach = await Coach.update(
      req.body,
      {

        where: {
          id: req.params.id,
        },
      });

    if (!updateCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(updateCoach);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;