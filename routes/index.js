var express = require('express');
var router = express.Router();

const Marker = require('../models/markers');
const { checkBody } = require('../modules/checkBody');


// POST /places : ajout d’un marqueur en base de données (via req.body) 
router.post('/places', (req,res) => {
    if (!checkBody(req.body, ["nickname","name", "latitude", "longitude"])){
        res.json({result : false, error : "Missing or empty fields"});
        return;
    }
        const newMarker = new Marker({
            nickname: req.body.nickname,
            name : req.body.name,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
        })
        newMarker.save().then(()=>{
            res.json({ result: true })
        })
    })



//GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur en fonction de son surnom (via req.params)
router.get('/places/:nickname', (req, res) => {
    Marker.find({ nickname: req.params.nickname }).then(data => {
      if (data) {
        res.json({ result: true, places: data });
      } else {
        res.json({ result: false, error: 'Marker not found' });
      }
    });
  });

// DELETE /places : suppression d’un marqueur à partir de son nom et du surnom de l’utilisateur (via req.body)
router.delete('/places', (req,res)=> {
    Marker.deleteOne({nickname : req.body.nickname, name : req.body.name})
    .then(()=> {
        res.json({result:true})
    })
})

module.exports = router;
