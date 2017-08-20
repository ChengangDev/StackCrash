var insertRow = function(hostname){
    var tbody = $( "#hostname_list").find('tbody');
    var num = tbody.children().length + 1;
    var html = "<tr><th scope='row'>" + num + "</th>";
    html += "<td>" + hostname + "</td>";
    html += "<td><a href='#' class='delete_link'>X</a></td></tr>";
    tbody.append(html);
}

var onUpdTbl = function(){

    var tbody = $( "#hostname_list").find('tbody');
    tbody.empty();
    chrome.storage.sync.get( "hostnames", function(items){
        if(!items.hostnames)
          return;

        for( i = 0; i < items.hostnames.length; ++i){
            insertRow(items.hostnames[i]);
        }

        $( ".delete_link" ).click(onDelete);
    });

}


var onServer = function(){

    var server = $("#server").val();
    var search = $("#search").val();

    if(!server || !search){
        alert("Error: No server or search input!");
        return;
    }

    if(server.indexOf("https:") !== 0){
        //server = "https://" + server;
    }

    chrome.storage.sync.set({'server':server, 'search':search }, function(){
    });

}


var onSet = function(){

    var username = $("#username").val();
    var password = $('#password').val();

    if(!username || !password){
        alert("Error: No username or password input!");
        return;
    }


    chrome.storage.sync.set({'username':username, 'password':password}, function(){
    });

}

var onTrack = function(){

    var url = $("#hostname").val();

    if(!url){
        alert("Error: No url input!");
        return;
    }

    chrome.storage.sync.get( "hostnames", function(items){
        //alert(items.hostnames);
        if(!items.hostnames)
          items.hostnames = [url];
        else
          items.hostnames.unshift(url);
        //alert(items.hostnames);
        chrome.storage.sync.set(items, function(){
            //insertRow(url);
            onUpdTbl();
        });
    });


}

var onHistory = function(){

}

var onDelete = function(a){
    var hostname = $(this).parent().prev().text();
    if(hostname){
        //alert(hostname);
        chrome.storage.sync.get( "hostnames", function(items){
            if(!items.hostnames)
              return;

            var index = items.hostnames.indexOf(hostname);
            if(index > -1){
                items.hostnames.splice(index, 1);
                chrome.storage.sync.set(items, function(){
                    //insertRow(url);
                    onUpdTbl();
                });
            }

        });
    }
}

var onImport = function(){

}

var onExport = function(){

}

$(document).ready(function(){

    $( '#setser' ).click(onServer);

    $( '#set' ).click(onSet);

    $( "#track" ).click(onTrack);

    $( "#history" ).on("click", onHistory);

    chrome.storage.sync.get( ["server", "search", "username", "password"], function(user){
        $( '#server' ).val(user.server);
        $( '#search' ).val(user.search);
        $( '#username' ).val(user.username);
        $( '#password' ).val(user.password);
    });

    onUpdTbl();
});
