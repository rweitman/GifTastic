//Sets up the starting buttons
 var sports = ["Soccer", "Bowling", "Tennis", "Golf","Hockey","Football"];

        function displaySportInfo(){

          //Removes previous images after this function starts
           $("#sports-view").empty();

            var type= $(this).attr("data-name");

        //Uses the API key to find 10 images related to the topic chosen
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + type + "&limit=10";
        console.log(queryURL);

      $.ajax ({
        url: queryURL, 
        method: 'GET'
      }).done(function(response) {

        console.log(response);

        //Assigns a class to the sportDiv variable
        var sportDiv = $("<div class='sporting'>");

        for (var i=0;i<10;i++)
        {
          if (response.data!="")
          {
           
        //Adds images to the webpage
        sportDiv.append("<br><img src='https://media3.giphy.com/media/" + response.data[i].id + "/giphy_s.gif' class='claim'>"); 


      //Adds rating to the webpage
        var rating = response.data[i].rating;
          var pOne = $("<p>").text("Rating: " + rating);
          sportDiv.append(pOne);

          //Stacks each image/rating on top of each other
          $("#sports-view").prepend(sportDiv);
        }}

          // Processes an image that is clicked
           $('.claim').on('click',function(){
        var foot = ($(this).attr("src"));

            //Alternates between still and animated images
            if (foot.indexOf("giphy_s")>=0)
            {
              foot = foot.replace("giphy_s.gif", "giphy.gif");}

              else {
                  foot = foot.replace("giphy.gif", "giphy_s.gif");
              }
  $(this).attr("src", foot);

});

});
   

    } 



      function renderButtons() {

        // Deleting the sports prior to adding new sports
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of sports
        for (var i = 0; i < sports.length; i++) {

          // Then dynamicaly generating buttons for each sport in the array
          var a = $("<button>");
          // Adding a class of sport to our button
          a.addClass("sport");
          // Adding a data-attribute
          a.attr("data-name", sports[i]);
          // Providing the initial button text
          a.text(sports[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a sport button is clicked
      $("#add-sport").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var sport= $("#sport-input").val().trim();

        // Adding sport from the textbox to our array
        sports.push(sport);

        // Calling renderButtons which handles the processing of our sport array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "sport"
      $(document).on("click", ".sport", displaySportInfo);
      $(document).on("click", "")

      // Calling the renderButtons function to display the initial buttons
      renderButtons();