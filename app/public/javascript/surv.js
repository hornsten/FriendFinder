$('#submit').on('click', function() {

    //First, make sure all the blanks have been filled
    var questions = $('.form-control');

    function validate() {
        var isValid = true;
        questions.each(function() {
            //If the blanks are empty or null, the form is invalid. Highlight empty fields with a red border
            if ($(this).val() === '' || $(this).val() === null) {
                isValid = false;
                $(this).css('border', '2px solid #ca4737');
            } else {
                //Return blanks to original border color upon form validation
                $(this).css('border', '1px solid #dce4ec');
            }
        })

        return isValid;
    }

    //If the form is valid, add new Friend to the friendsData API. First, grab the values from the form.
    if (validate()) {

        var newFriend = {
            name: $('#name').val().trim(),
            photo: $('#photo').val().trim(),
            scores: [$('#q1').val(), $('#q2').val(), $('#q3').val(), $('#q4').val(), $('#q5').val(), $('#q6').val(), $('#q7').val(), $('#q8').val(), $('#q9').val(), $('#q10').val()]
        };

        //Grab the page URL
        var currentURL = window.location.origin;

        //Post the newFriend to the API, and receive his/her love connection(s) as a response from the backend (logic contained in apiRoutes.js.
        $.post(currentURL + "/api/friends", newFriend, function(data) {

            //Empty the previous contents of the Love Modal
            $('#love-modal-body').empty();

            //Loop through the data and display newFriend's love connection(s) in the modal. Name and photo for each love connection will be appended.

            for (var i = 0; i < data.length; i++) {

                displayMatches(data[i].photo, data[i].name);

            }

            //Show the modal      
            $('#myModal').modal('show');
            //Clear the form
            $('.form-control').val('');
            $('.dropdown').val('1');
        })

    } else {

        //If the form is invalid, show the blanksModal, which alerts the user to fill out all the fields before submitting
        $('#blanksModal').modal('show');
    }

    //do not refresh the page
    return false;
})

function displayMatches(src, name) {

    var defaultImg = '/images/placeholder.jpg';

    var img = new Image();
    img.onload = function() {
        // code to set the src on success

        $('#love-modal-body').append('<img class="img-thumbnail img-responsive" src="' + src + '" alt="Best Match" style="width:350px;height:250px;">' + '<h5 class="text-default">' + name + '</h5><br><br>');
    };
    img.onerror = function() {
        // doesn't exist or error loading

        $('#love-modal-body').append('<img class="img-thumbnail img-responsive" src="' + defaultImg + '" alt="Best Match" style="width:350px;height:250px;">' + '<h5 class="text-default">' + name + '</h5><br><br>');
    };

    img.src = src; // fires off loading of image
}
