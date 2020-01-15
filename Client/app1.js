(function ($) {
    var dataTable = $('#movieTable');
    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            DirectorName: this["director"].value
        };
        $.ajax({
            url: 'https://localhost:44352/api/Movie',
            dataType: 'json',
            type: 'Post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                dataTable.append('<tr><td>' + dict.Title + '</td><td>' + dict.Genre + '</td><td>' + dict.DirectorName + '</td></tr>')
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }
    $('#add-movie').submit(processForm);
    function newTable() {
        
        getTableValue(function (i, value) {
            if (i === 0) {
            } else {
                dataTable.append('<tr><td>' + value.Title + '</td><td>' + value.Genre + '</td><td>' + value.DirectorName + '</td></tr>')
            }
        });
    }
    function getTableValue(method) {
        $.ajax({
            url: 'https://localhost:44352/api/Movie',
            dataType: 'json',
            type: 'Get',
            contentType: 'application/json',
            success: function (data, textStatus, jqXhr) {
                $.each(data, method);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    document.getElementById("table").innerHTML = newTable();
})(jQuery);
