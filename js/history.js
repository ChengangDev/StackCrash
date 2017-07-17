var onOptions = function(){
    var newURL = "options.html";
    chrome.tabs.create({ url: newURL });
}

var onTrack = function(){

}

var onHistory = function(){

}

$(document).ready(function(){
   $( "#options" ).click(onOptions);

   $( "#track" ).on("click", onTrack);

   $( "#history" ).on("click", onOptions);
});
