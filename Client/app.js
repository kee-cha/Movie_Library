(function ($)
{
    var dataTable = $('#movieTable');
    function processForm(e){
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
            success: function (data, textStatus, jQxhr) {
                dataTable.append('<tr><td>' + dict.Title + '</td><td>' + dict.Genre + '</td><td>' + dict.DirectorName + '</td><td><button type="submit">Edit</button></td></tr>')
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }
    
    $('#add-movie').submit(processForm);

    function getTableValue(){       
        $.ajax({
            url: 'https://localhost:44352/api/Movie',
            dataType: 'json',
            method: 'Get',
            contentType: 'application/json',
            success: function (data, textStatus, jqXhr) {
                $.each(data,function (i, value) {
                dataTable.append('<tr><td>' + value.Title + '</td><td>' + value.Genre + '</td><td>' + value.DirectorName + '</td><td><button onclick ="updateTableValue()">Edit</button></td></tr>')
            });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    getTableValue();



    function updateTableValue(){
        $.ajax({
            url: 'https://localhost:44352/api/Movie' + MovieId,
            dataType: 'json',
            method: 'Put',
            contentType: 'application/json',
            data: JSON.stringify(dict), 
            success: function (data) {
                $.each(data,function (i, value) {
                    dataTable.append('<tr><td>' + value.Title + '</td><td>' + value.Genre + '</td><td>' + value.DirectorName + '</td><td><button onclick ="updateTableValue()">Edit</button></td></tr>')
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });    
    }
    updateTableValue();
})(jQuery);


