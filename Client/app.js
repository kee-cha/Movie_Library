var $dataTable = $('#movieTable');
(function ($) {

    function processForm(e) {
        $(document).ready();{
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
    }


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
                $dataTable.empty();
                $.each(movie, function (i, value) {
                    $dataTable.append('<tr align = "middle"><td>' + value.Title +'</td>'+
                    '<td>' + value.Genre +'</td>'+
                    '<td>' + value.DirectorName +'</td>'+
                    '<td><button onclick = "getOneMovie(' + value.MovieId + ')">Edit</button></td>'+
                    '<td><button onclick = "deleteMovie(' + value.MovieId + ')">Delete</button></td></tr>')
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
            Title: $('#mT').val(),
            Genre: $('#gT').val(),
            DirectorName: $('#dN').val(),
        }
        $.ajax({
            url: 'https://localhost:44352/api/Movie/' + id,
            dataType: 'json',
            type: 'Put',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function (data, textStatus, jqXhr) {
                document.getElementById("pageHeader").style.display = "block";
                document.getElementById("add-movie").style.display = "block";
                $('#movieTable').empty();
                getTableValue();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    ;
}
function deleteMovie(id) {
    $(document).ready(); {
        $.ajax({
            url: 'https://localhost:44352/api/Movie/' + id,
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
function getOneMovie(id) {
    $(document).ready(); {
        $.ajax({
            url: 'https://localhost:44352/api/Movie/' + id,
            dataType: 'json',
            type: 'Get',
            contentType: 'application/json',
            success: function (data, textStatus, jqXhr) {                
                document.getElementById("pageHeader").style.display = "none";
                document.getElementById("add-movie").style.display = "none";
                $('#movieTable').empty();
                $dataTable.append('<tr align = "middle">'+
                '<td><input type="text" name="title" placeholder="' + data.Title + ' "id="mT"/></td>'+
                '<td><input type="text" name="genre" placeholder="' + data.Genre + '" id="gT"/></td>'+
                '<td> <input type="text" name="director" placeholder="' + data.DirectorName + '" id="dN"/></td>'+
                '<td><button onclick = "updateTableValue(' + data.MovieId + ')">update</button></td>'+
                '<td><button onclick = "deleteMovie(' + data.MovieId + ')">Delete</button></td>'+
                '<td><button onclick = "getTableValue()">Back to List</button></td>'+
                '</tr>')
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    };
}

