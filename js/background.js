

chrome.tabs.onUpdated.addListener(function (tabId , info) {

  if (info.status === 'complete') {
    chrome.tabs.get(tabId, function(tab){
        if(!tab)
            return;

        var url = tab.url;
        var title = tab.title;

        chrome.tabs.getAllInWindow(null, function(tabs){
            //skip when history is opened
            for (var i = 0; i < tabs.length; i++) {
                if(tabs[i].url.indexOf("chrome-extension") == 0 && tabs[i].url.indexOf("history.html") > 0)
                    return;
            }

            chrome.storage.sync.get( "hostnames", function(items){
                //alert(url);
                if(!items.hostnames)
                    return;
                for( i = 0; i < items.hostnames.length; ++i){
                    if(url.indexOf(items.hostnames[i]) !== -1){
                        chrome.storage.sync.get(['username', 'password', 'server'], function(auths){
                            var content = {
                                'url': url,
                                'title': title,
                                'username': auths.username,
                                'password': auths.password
                            };
                            //alert(auths.server);
                            $.post(auths.server, content, function(data){
                                //alert(data);
                            });
                        });
                        break;
                    }
                }
            });
        });

        //alert(url);
    });

  }
});
