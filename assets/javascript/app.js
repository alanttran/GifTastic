$(document).ready(function() {

    var topics = ["Archer", "Futurama", "Minions", "Spongebob", "Simpsons", "Garfield", "Rugrats"];

    loadTopicButtons();

    // loops through topics array and append buttons to HTML
    function loadTopicButtons(){
        $('.buttons').empty();
        $.each(topics, function(i, val) {
            var topicButton = $('<button>').attr('class', 'btn').addClass('btn-primary').text(val);
            $('.buttons').append(topicButton);
        });
    }
    

    // whenever a button is clicked
    // query the subject
    // and populate gifs
    $('.buttons').on('click', ".btn-primary", function() {
        console.log($(this).text());

        var topicFromButton = $(this).text();
        getGifs(topicFromButton);

    });

    $(document).on('click', '.gif-image', function() {
        var stateAttr = $(this).attr('data-state');

        if (stateAttr === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

    // takes an array of gif objects
    // and creates elements in the HTML in gif-area
    function populateGifs(array) {
        console.log('populateGifs');
        console.log(array);

        var gifArea = $('.gif-area');
        gifArea.empty();

        $.each(array, function(i, val) {
            gifArea.append($('<div>', {class: 'gif-container'}).append($('<div>').text("Rating: " + val.rating))
                .append($('<img>')
                .attr('src', val.images.fixed_height_small_still.url)
                .attr('data-still', val.images.fixed_height_small_still.url)
                .attr('data-animate', val.images.fixed_height_small.url)
                .attr('data-state', 'still')
                .addClass('gif-image')));
        });
    }

    // queries the API with the subject
    // and calls populatesGifs array
    function getGifs(subject) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            subject + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var gifArray = [];

                $.each(response.data, function(i, val) {

                    gifArray = response.data;
                });

                populateGifs(gifArray);

            });
    }

    // whenever submit button is clicked
    // add button to array
    // reload array in html
    $('.btn-success').on('click', function() {
        event.preventDefault();
        console.log($('#cartoon-add-input').val());
        topics.push($('#cartoon-add-input').val());
        loadTopicButtons();

    });


});
