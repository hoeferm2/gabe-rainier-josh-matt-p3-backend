const router = require('express').Router();
const { Client, Coach, } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


//TODO: WORKING
router.get("/", (req, res) => {
  Coach.findAll({
    include: [Client]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "womp womp", err })
  })
})

//TODO: get Coach by id
//TODO: WORKING
router.get("/:id", async (req, res) => {
  try {
    const coachData = await Coach.findOne(
      {
        include: { model: Client },
      });

    if (!coachData) {
      res.status(404).json({ message: 'No Coach found with that id!' });
      return;
    }

    res.status(200).json(coachData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", (req, res) => {
  Coach.create(req.body).then(newCoach => {
    const token = jwt.sign({
      id: newCoach.id,
      email: newCoach.email
    }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    })
    return res.json({
      token: token,
      user: newCoach
    })
  }).catch(err => {
    res.status(500).json({ msg: "Sorry, we couldn't process your request!", err })
  })
})

// MHH added username to token 9/3/2022
router.post("/login", (req, res) => [
  Coach.findOne({
    where: { email: req.body.email }
  }).then(foundUser => {
    if (!foundUser) {
      return res.status(401).json({ msg: "Coach does not exist" })
    }
    else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "invalid login password" })
    } else {
      const token = jwt.sign({
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        isCoach: foundUser.isCoach
      }, process.env.JWT_SECRET, {
        expiresIn: "2hr"
      })
      return res.json({ token: token, user: foundUser })
    }
  }).catch(err => {
    res.status(500).json({ msg: "Server error", err })
  })
])


router.get("/user-from-token", (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    Coach.findByPk(userData.id, {
      include: {
        model: Client
      }
    }).then(userData => {
      res.json(userData)
    }).catch(err => {
      res.status(500).json({ msg: "an error occurred", err })
    })
  } catch {
    res.status(403).json({ msg: "invalid token" })
  }
})

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