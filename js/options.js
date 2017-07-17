
var onTrack = function(){

    var url = $("#hostname").val();

    if(!url){
        alert("Error: No url input!");
        return;
    }
    chrome.storage.sync.set({"test":url}, function(){
        alert(chrome.storage.sync.get("test", function(cfg){
          alert(cfg);
        }));
    });

}

var onHistory = function(){

}

var onDelete = function(){

}

var onImport = function(){

}

var onExport = function(){

}


$(document).ready(function(){

   $( "#track" ).click(onTrack);

   $( "#history" ).on("click", onHistory);
});
