
  // -----------------------------------------------------------------------------------------------------------------------
  // CREATE NEW TASK FROM HTML FORM:
    //------------------------------------------------------------------------------
$(".my_form").submit(function(e) {
        e.preventDefault();

        var form_data = $(".my_form").serialize()

          $.ajax({
                  type: 'POST',
                  url: 'http://127.0.0.1:8000/api/tasks/', //+ button_id,

                  data: form_data,
                  error: function(e) {
                    console.log(e);
                  }
          });
          $('<meta http-equiv="refresh" content="0">').appendTo(document.body);
    });


//------------------------------------------------------------------------------------------------
// GET INFO FROM THE API

$.get('http://127.0.0.1:8000/api/tasks/', function(data)

{
  console.log(data)

  //------------------------------------------------------------------------------
  /// PAGE HEADER 2

  var count = data['count'];
  $('<h3><p id=test1>Tasks count:  '+ count +' </p></h3>').appendTo(document.body);


///-----------------------------------------------------------------------------------
/// SHOWING EVERY ITEM PRESENT IN THE API CONTENT

  //$(<p>Input field: </p>);

  var results = data['results'];

  for (var x in results) {

      var title = results[x].title;
      var status = results[x].status;
      var priority = results[x].priority;

      var list_item = results[x].url.match(/\d*.$/g);

      var item = results[x].url.match(/\d+/g)[5]

      var $div = $('<div/>');
 //- Status:  <input type="text" id="test3" value="'+status+'">
      $('<p class="ju'+ item +'"> - Task Name: <input type="text" id="title'+ list_item +'" value="'+title+'"> - Status:  <input type="text" id="status'+ list_item +'" value="'+status+'"> - Priority:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="priority'+ list_item +'" value="'+priority+'"></p>').appendTo($div);

//-----------------------------------------------------------------------------------------------------------------------
// CREATING A DELETE BUTTON/REQUEST FOR EVERY SINGLE ITEM IN THE API:

      $('<button class="ju'+ item +'", id="'+ list_item +'">Delete</button>').appendTo($div).click(function() {

        var button_id =  this.id
        var b_class = '.'+ $(this).attr('class');

        //console.log(div_class)

        $.ajax({
                url: 'http://127.0.0.1:8000/api/tasks/' + button_id,
                type: 'DELETE',
        });

       $( b_class ).slideUp();


       count = count - 1;

       $("#test1").text('Tasks count: '+ count)

      });


// -----------------------------------------------------------------------------------------------------------------------
// CREATING A UPDATE BUTTON/REQUEST FOR EVERY SINGLE ITEM IN THE API:
//
      $('<button class="ju'+ item +'", id="'+ list_item +'">Update</button>').appendTo($div).click(function() {

        var button_id =  this.id

        // Getting values from every single input displayed
        var input_title = 'title' + button_id
        var input_status = 'status' + button_id
        var input_priority = 'priority' + button_id
        // Creation of a dictionary using getElementById
        var dict = {title: document.getElementById(input_title).value, status: document.getElementById(input_status).value, priority: document.getElementById(input_priority).value};
        //console.log(dict)
        // Creation of the specific URL where the data will be modify
        var g = 'http://127.0.0.1:8000/api/tasks/'+button_id
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: g, // A valid URL
            data: dict // Some data e.g. Valid JSON as a string
        });

      });

      $div.appendTo(document.body)
      //console.log($div)
  }

});
