// DEPENDENCIES
var path = require('path');
var friendsData = require('../data/friends.js');


// ROUTING

module.exports = function(app) {


    app.get('/api/friends', function(req, res) {

        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {

        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table 
        if (friendsData.length < 5) {
            friendsData.push(req.body);
            res.json(true); // KEY LINE
        }

        // Or false if they don't have a table
        else {
            friendsData.push(req.body);
            res.json(false); // KEY LINE
        }

    });


    app.post('/api/clear', function(req, res) {
        // Empty out the arrays of data
        friendsData = [];


        console.log(friendsData);
    })

}
