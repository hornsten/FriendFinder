// DEPENDENCIES
var path = require('path');
var friendsData = require('../data/friends.js');


// ROUTING

module.exports = function(app) {

    //if user goes to this path, they will see friendsData in JSON format...the API
    app.get('/api/friends', function(req, res) {

        res.json(friendsData);
    });

    //if user's form is valid, their newFriend object is processed here as a request. In
    //response, the newFriend's love connection(s) will be sent to the front end as a data object
    app.post('/api/friends', function(req, res) {

        var scoresArray = [];



        //Loop through each friend in friendsData...
        for (var i = 0; i < friendsData.length; i++) {

            var individualArray = [];

            //For each friend, loop through their scores for each question...   
            for (var j = 0; j < friendsData[0].scores.length; j++) {

                //Compare the answers of the newFriend with those of friend i in the API. Find the
                //absolute difference between each pair of scores and push it to the individualArray
                var diff = Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
                individualArray.push(diff);
            }

            //sum the contents in the individualArray to get a compatibility score for 
            //newFriend and friend i           
            var totes = individualArray.reduce((a, b) => a + b, 0);

            //push the compatibility score for each potential match into scoresArray         
            scoresArray.push(totes);
        }
        //find the smallest number in the array, which indicates the most compatible match for our newFriend
        function arrayMin(array) {
            return array.reduce(function(a, b) {
                return Math.min(a, b);
            });
        }
        //Just in case there are multiple partners tied for best match, we get all indexes of that lowest number.
        function getAllIndexes(arr, val) {
            var indexes = [],
                i = -1;
            while ((i = arr.indexOf(val, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        }
        //Call the functions
        var smallestDiff = arrayMin(scoresArray);
        var indexesForMatches = getAllIndexes(scoresArray, smallestDiff);
        var matchesArray = [];


        //Push the most compatible partners into an array...
        for (var i = 0; i < indexesForMatches.length; i++) {
            matchesArray.push(friendsData[indexesForMatches[i]]);
        }
        //...and send that array as a data response to the front end.
        res.json(matchesArray);

        //Finally, add newFriend to the friendsData API
        friendsData.push(req.body);

    });

    //If the API needs to be cleared out quickly during development, this route is available
    app.post('/api/clear', function(req, res) {
        // Empty out the arrays of data
        friendsData = [];


        console.log(friendsData);
    })

}
