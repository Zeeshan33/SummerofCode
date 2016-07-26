var listItems = [];







$("#add").click(function() {
    var newValue;
    var arr;
    

    if ($('#newtodo').val() != "")
    {
      newValue = $('#newtodo').val();
      listItems.push(newValue);
      $('#newtodo').val('');
    }
    
   renderJSON(listItems);
   save();

});

function save ()
{
 //localStorage.myData = JSON.stringify(listItems);

 $.ajax({
      url: '/gettodo', 
      type: 'POST', 
      contentType: 'application/json', 
      data: JSON.stringify(listItems),
  success:function(res){console.log(res);}
  });
}

function load()
{
  

  
  //listItems = JSON.parse(localStorage.myData);
  $.get('/settodo',function(res){
    console.log(res);
    listItems = res;
    renderJSON(listItems);
  });

  
}

function renderJSON(data)
{
  $('#container').empty();
  for (i = 0; i < data.length; i++)
  {
	var valueToAdd = data[i];
    $('#container').append('<div id="'+valueToAdd+'"> <input type="checkbox" id="'+valueToAdd+'"> <span id="'+valueToAdd+'">'+ valueToAdd +'</span> <br> </div>');

    $('#' + valueToAdd).on('click', function() {
        var valueToRemove = $(this).attr("id");
        //$(this).remove();
        var index = listItems.indexOf(valueToRemove);

        if (index > -1)
        {
          listItems.splice(index, 1);
        }
        renderJSON(listItems);
        save();
        
   });   
 }
}

load();