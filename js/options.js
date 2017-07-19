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

    $( "#track" ).click(onTrack);

    $( "#history" ).on("click", onHistory);



    onUpdTbl();
});
