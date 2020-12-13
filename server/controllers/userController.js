const db = require("../models");
const md5 = require("md5");
const getSession = (account) => {
    return {
        id: account._id,
        name: account.name,
        image: account.image,
        token: md5(account.email + account.date)
    }
}
// Testing md5 :)
// console.log("Szilard is " + md5("Szilard"));
// console.log("Rhonda is " + md5("Rhonda"));
// console.log("Miguel is " + md5("Miguel"));
// console.log("Andreia is " + md5("Andreia"));

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel.map((user)=>{return {image:user.image,id:user._id}})))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  login:function(req, res)
  {
    db.User
      .findOne({email:req.body.email.toLowerCase()})
      .then(dbModel => {
        console.log(dbModel)
        console.log(" Password:",md5(req.body.password))
        if(dbModel.password==md5(req.body.password))
        {
          console.log(getSession(dbModel));
          res.json(getSession(dbModel))
        }
        else
        {
          res.sendStatus(401);
        }
      })
      .catch(err => res.status(422).json(err));
  },

  getUserFromImage: function(req,res) {
    console.log("stuff", req.body)
    db.User
      .find({image:req.body})
      .then(dbModel => {
        console.log("GIVE ME THE ID!" + dbModel)
        res.json(getSession(dbModel))
      })
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    console.log("Creating user...")
      let account = req.body;
      account.email = req.body.email.toLowerCase();
      account.password = md5(req.body.password);
    db.User
      .create(account)
      .then(dbModel =>  {
        console.log(getSession(dbModel));
        res.json(getSession(dbModel))
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
