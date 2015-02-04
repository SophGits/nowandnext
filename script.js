var url = "http://atlas.metabroadcast.com/3.0/schedule.json?channel_id=cbbh&annotations=channel,channel_summary,description,brand_summary,broadcasts,series_summary,available_locations&from=2013-06-21T11:00:00.000Z&to=2013-06-21T23:00:00.000Z&apiKey=84097c4de516445eb7bb58f4b73d2842"

var formatTime = function(time){
  return time.toLocaleTimeString("en-uk", {
              hour: "2-digit",
              minute: "2-digit",
              seconds: false
          })
    .replace("AM", "am").replace("PM","pm").replace(" ", "");
}

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: url
  })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      // console.log( "Ajax request complete" );
    })
    .done(function(data){
      var programmes = data["schedule"][0]["items"];
      console.log("prog: ", programmes);

      var title;
      var start;
      var end;
      var image;
      var description;
      $.each(programmes, function(key, val){
        // console.log("key: ", key, "title: ", val["title"]);
        title = val["title"];

        // start = new Date(val["broadcasts"][0]["transmission_time"]);
        // console.log(start);

        start = formatTime(new Date(val["broadcasts"][0]["transmission_time"]));
        console.log(start);

        end = formatTime(new Date(val["broadcasts"][0]["transmission_end_time"]));
        console.log(end);

        image = val["image"];

        description = val["description"];

        console.log("");
      });

    });
});


