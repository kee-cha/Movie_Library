var $dataTable = $('#movieTable');
(function ($) {
  
    function processForm(e) {

        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            DirectorName: this["director"].value
        };
        $.ajax({
            url: 'https://localhost:44352/api/Movie',
            dataType: 'json',
            method: 'Post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data) {
                $('#movieTable').empty();
                getTableValue();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert('error adding movies');
            }
        });
        e.preventDefault();
    }
    $('#add-movie').submit(processForm);

    
    getTableValue();
})(jQuery);
function getTableValue() {
    $(document).ready(); {
        $.ajax({
            url: 'https://localhost:44352/api/Movie',
            dataType: 'json',
            method: 'Get',
            contentType: 'application/json',
            success: function (movie) {
                $.each(movie, function (i, value) {
                    $dataTable.append('<tr align = "middle"><td>' + value.Title + 
                    '</td><td>' + value.Genre + 
                    '</td><td>' + value.DirectorName + 
                    '</td><td><button onclick = "updateTableValue('+value.MovieId+')">Edit</button>'+
                    '</td><td><button onclick = "deleteMovie('+value.MovieId+')">Delete</button></td></tr>')
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert('error loading movies');
            }
        })
    };
}
function updateTableValue(id) {
    var movie = {
        Title: $('#titleName').val(),
        Genre: $('#genreName').val(),
        DirectorName: $('#directorName').val(),
        MovieId: id
    }
    $(document).ready(); {
        $.ajax({
            url: 'https://localhost:44352/api/Movie/'+id,
            dataType: 'json',
            type: 'Put',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function (data, textStatus, jqXhr) {                
                $('#movieTable').empty();
                getTableValue();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    };
}
function deleteMovie(id){
    $(document).ready(); {
        $.ajax({
            url: 'https://localhost:44352/api/Movie/'+id,
            dataType: 'json',
            type: 'Delete',
            contentType: 'application/json',
            data: id,
            success: function (data, textStatus, jqXhr) {                
                $('#movieTable').empty();
                getTableValue();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    };
}


