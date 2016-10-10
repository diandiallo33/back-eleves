var express = require('express');
var router = express.Router();

var servicemongo= require('../servicemongo');

    function header(res)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    }

    //Liste des eleves
  router.get('/eleves', function(req, res, next) {

          header(res);

        servicemongo.listeEleves( function (docs) {
                 res.send(JSON.stringify(docs));
             }
         );
  });

    //Ajouter eleve
  router.all('/eleves/ajouter', function(req, res, next) {

          header(res);
          var cle = Object.keys(req.body)[0];
          var eleve= JSON.parse(cle);
        servicemongo.ajouterEleve(eleve,
           function (result) {
                res.send('ok');
           }
         );

  });

    //Supprimer eleve
    router.all('/eleves/supprimer', function(req, res, next) {

        header(res);
        var cle = Object.keys(req.body)[0];
        var eleve= JSON.parse(cle);
        servicemongo.supprimerEleve(eleve,
            function (result) {
                res.send('ok');
            }
        );

    });

    //Modifier eleve
    router.all('/eleves/modifier', function(req, res, next) {

        header(res);
        var cle = Object.keys(req.body)[0];
        var eleve= JSON.parse(cle);
        var id=eleve._id;
        delete  eleve['_id'];
        servicemongo.modifierEleve(eleve, id,
            function (result) {
                res.send('Bien');
            }
        );

        //res.send('ok');

    });

module.exports = router;
