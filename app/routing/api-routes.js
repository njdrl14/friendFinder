var path = require("path");
var friendInfo = require("../data/friends.js");

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(friendInfo);
	});

	app.post('/api/friends', function(req, res){


	var emptyArray = [];

	for(var i = 0; i < req.body.scores.length; i++){
		emptyArray.push(parseInt(req.body.scores[i]));
	}

	req.body.scores = emptyArray;

	var match = {
		name: '',
		photo: '',
		total: 50
	};

	for(var i =0; i < friendInfo.length; i++){
		var arrayCheck = friendInfo[i].scores;

		var sum = emptyArray.map(function(num, idx){
			return Math.abs(num - arrayCheck[idx]);
		});

		var totalSum = sum.reduce(add, 0);
		function add(a,b) {
			return a + b;
		}

		if(totalSum <= match.total){
			match.name = friendInfo[i].name;
			match.photo = friendInfo[i].photo;
			match.total = totalSum;
		}
	}
	friendInfo.push(req.body);
	res.json(match);

	});
};