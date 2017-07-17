var onOptions = function(){
    var newURL = "options.html";
    chrome.tabs.create({ url: newURL });
}

var onTrack = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

         // since only one tab should be active and in the current window at once
         // the return variable should only have one entry
        var activeTab = arrayOfTabs[0];
        var activeTabId = activeTab.id; // or do whatever you need
        var tabUrl = activeTab.url;
        var a = document.createElement("a");
        a.href = tabUrl;
        var url = prompt("Enter hostname for tracking", a.hostname);

    });

}

var onHistory = function(){
    var newURL = "history.html";
    chrome.tabs.create({ url: newURL });
}

$(document).ready(function(){
   $( "#options" ).click(onOptions);

   $( "#track" ).on("click", onTrack);

   $( "#history" ).on("click", onHistory);
});
