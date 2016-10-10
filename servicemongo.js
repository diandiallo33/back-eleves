var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/back-eleves';

var ObjectID=require('mongodb').ObjectID;


     exports.listeEleves=  function (callback) {

            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                var collection = db.collection('eleves');

                collection.find().toArray(function(err, docs) {
                    assert.equal(err, null);
                    console.log("Enregistrements obtenus");
                    console.log(docs);
                    callback(docs);

                });

            });

        }

     exports.ajouterEleve = function(eleve,callback) {

            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                var collection = db.collection('eleves');
                collection.insertOne(eleve, function (err, result) {
                    assert.equal(err, null);
                    console.log("Insertion reussie");
                    callback(result);
                });

            });
    }

    exports.supprimerEleve = function(eleve,callback) {

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection('eleves');
            collection.deleteOne({'_id':new ObjectID(eleve._id)}, function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.deletedCount);
                console.log("Suppresion reussie");
                callback(result);
            });

        });
    }

    exports.modifierEleve = function(eleve,id,callback) {

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection('eleves');
            collection.updateOne({'_id':new ObjectID(id)}, { $set: eleve }, function(err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Modification reussie");
                    callback(result);
            });

        });
    }




