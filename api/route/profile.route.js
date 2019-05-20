const express = require('express');
const profileRoutes = express.Router();
const bcrypt = require("bcryptjs");
console.log(bcrypt);

// Require Business model in our routes module
let Profile = require('../model/profile.model');
const validateRegisterInput = require("../validation/register");

// Defined store route
profileRoutes.route('/add').post(function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
    Profile.findOne({ email: req.body.email }).then(profile => {
        if (profile) {
          return res.status(400).json({ email: "Email already exists" });
        } 
    const newProfile = new Profile({
            nom: req.body.nom,
            email: req.body.email,
            password: req.body.password
          });
      
    // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newProfile.password, salt, (err, hash) => {
              if (err) throw err;
              newProfile.password = hash;
              newProfile
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            });
          });
        });
  });

  // Defined get data(index or listing) route
  profileRoutes.route('/').get(function (req, res) {
    Profile.find(function(err, profile){
      if(err){
        console.log(err);
      }
      else {
        res.json(profile);
      }
    });
});

// Defined edit route
profileRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Profile.findById(id, function (err, profile){
      res.json(profile);
  });
});

//  Defined update route
profileRoutes.route('/update/:id').post(function (req, res) {
  Profile.findById(req.params.id, function(err, profile) {
    if (!profile)
      res.status(404).send("data is not found");
    else {
      profile.nom = req.body.nom;
      profile.email = req.body.email;
      profile.password = req.body.password;

      profile.save().then(profile => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
profileRoutes.route('/delete/:id').get(function (req, res) {
  Profile.findByIdAndRemove({_id: req.params.id}, function(err, profile){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = profileRoutes;
