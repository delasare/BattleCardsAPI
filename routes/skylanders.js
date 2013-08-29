var mongo = require('mongodb');
var url = require('url');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {safe: false, auto_reconnect: true});
 db = new Db('skylandersdb', server);

db.open(function(err, db){
	if(!err){
		console.log("Connected to Skylanders database");
		db.collection('skylanders', {strict:true}, function(err, collection){
			if(err){
				console.log("The Skylanders Collection Doesn't Exist");
				populateDB();
			}
		});
	}
});

//All
exports.findAll = function(req, res){
  var qstring = req.query;
  console.log(qstring);
  db.collection('skylanders', function(err, collection){
    collection.find(qstring).toArray(function(err, items){
			res.send(items);
		});
	});
};
//By ID
exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retrieving Skylander: ' + id);
	db.collection('skylanders', function(err, collection){
		console.log(err);
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
	});	
};

exports.addSkylander = function(req, res) {
    console.log(req.body);
    var skylander = req.body;
    console.log('Adding Skylander: ' + JSON.stringify(skylander));
    db.collection('skylanders', function(err, collection) {
        collection.insert(skylander, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateSkylander = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating Skylander: ' + id);
    console.log(JSON.stringify(skylander));
    db.collection('skylanders', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating skylander: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}
 
exports.deleteSkylander = function(req, res) {
    var id = req.params.id;
    console.log('Deleting skylander: ' + id);
    db.collection('skylanders', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}





var populateDB = function() {
 
    var skylanders = [
  {
    "name": "Eye Brawl",
    "element": "Undead",
    "power": 150,
    "speed": 100,
	  "shield": 50,
	  "luck": 50,
	  "image": "eyebrawl.jpg",
	  "series": 2
  },
  {
    "name": "Chop Chop",
    "element": "Undead",
    "power": 150,
    "speed": 100,
	  "shield": 50,
	  "luck": 50,
	  "image": "chopchop.jpg",
	  "series": 1
  },
  {
    "name": "Hex",
    "element": "Undead",
    "power": 150,
    "speed": 100,
	  "shield": 50,
	  "luck": 50,
	  "image": "hex.jpg",
	  "series": 1
  },
  {
    "name": "Cynder",
    "element": "Undead",
    "power": 150,
    "speed": 100,
	  "shield": 50,
	  "luck": 50,
	  "image": "cynder.jpg",
	  "series": 1
  },
  {
    "name": "Double Trouble",
    "element": "Magic",
    "power": 90,
    "speed": 30,
    "shield": 60,
    "luck": 100,
    "image": "doubletrouble.jpg",
    "series": 1
  },
  {
    "name": "Hot Dog",
    "element": "Fire",
    "power": 85,
    "speed": 70,
    "shield": 50,
    "luck": 80,
    "image": "hotdog.jpg",
    "series": 2
  },
  {
    "name": "Pop Fizz",
    "element": "Magic",
    "power": 65,
    "speed": 50,
    "shield": 50,
    "luck": 105,
    "image": "popfizz.jpg",
    "series": 2
  }
];
 
    db.collection('skylanders', function(err, collection) {
        collection.insert(skylanders, {safe:true}, function(err, result) {});
    });
 
};