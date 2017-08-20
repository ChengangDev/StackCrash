var searchResults = [];

var insertRow = function(index, url, title, time){
    var tbody = $( "#history_list").find('tbody');
    var num = index;
    var html = "<tr><th scope='row'>" + num + "</th>";
    html += "<td>" + time + "</td>";
    //html += "<td>" + title + "</td>";
    html += "<td><a target='_blank' href='" + url + "'>" + title + "</a></td></tr>";
    //html += "<td><a target='_blank' href='#' class='delete_link'>X</a></td></tr>";
    tbody.append(html);
}

var onUpdTbl = function(){

    var tbody = $( "#history_list").find('tbody');
    tbody.empty();

    for( var i = 0; i < searchResults.length; ++i){
        var url = searchResults[i].url;
        var title = searchResults[i].title;
        var time = searchResults[i].date;
        insertRow(i+1, url, title, time);
    }
}

var dateStrToTime = function(str){
    var decomposed = str.split("-");
    var date = new Date(decomposed[0], decomposed[1]-1, decomposed[2]);
    //alert(date);
    return date.getTime();
}

var onSearch = function() {
    var from = $("#datepicker1").val();
    var to = $("#datepicker2").val();
    //alert(from);
    chrome.storage.sync.get(['username', 'password', 'server'], function(auths){
        var content = {
            'start': from,
            'end': to,
            'username': auths.username,
            'password': auths.password
        };

        $.get(auths.server, content, function(data){
            //alert(data);
            searchResults = []
            for(var i = 0; i < data.length; ++i){
                searchResults.push(data[i]);
            }
            //alert(JSON.stringify(searchResults));
            onUpdTbl();
        });
    });
    chrome.history.search({
        'text':'',
        'startTime':dateStrToTime(from),
        'endTime':dateStrToTime(to),
        'maxResults':100000
    }, function(historyItems){

    });
}

var initDate = function () {
    var d = new Date();
    d.setDate(d.getDate() - 0);
    $("#datepicker1").val(d.toISOString().substr(0, 10));

    d.setDate(d.getDate() + 0);
    $("#datepicker2").val(d.toISOString().substr(0, 10));

    $("#search").click(onSearch);
}

$(document).ready(function(){

    initDate();

    onUpdTbl();
});
