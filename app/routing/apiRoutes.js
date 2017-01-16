// DEPENDENCIES
var path = require('path');
var friendsData = require('../data/friends.js');


// ROUTING

module.exports = function(app) {


    app.get('/api/friends', function(req, res) {

        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {
        var scoresArray = [];
        for (var i = 0; i < friendsData.length; i++) {

            var individualArray = [];
            for (var j = 0; j < friendsData[0].scores.length; j++) {

                var diff = Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
                individualArray.push(diff);

            }
            var totes = individualArray.reduce((a, b) => a + b, 0);
            scoresArray.push(totes);
            console.log(scoresArray);

        }

        function indexOfSmallest(a) {
            var lowest = 0;
            for (var i = 1; i < a.length; i++) {
                if (a[i] < a[lowest]) lowest = i;
            }
            return lowest;
        }
        var bestMatch = indexOfSmallest(scoresArray);
        console.log(scoresArray);
        console.log(bestMatch);
        res.json(friendsData[bestMatch].name + " is your best match!");
        friendsData.push(req.body);

    });


    app.post('/api/clear', function(req, res) {
        // Empty out the arrays of data
        friendsData = [];


        console.log(friendsData);
    })

}
