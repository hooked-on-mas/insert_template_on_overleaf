// chrome.runtime.onInstalled.addListener(() => {
    let parent = chrome.contextMenus.create({
        id : "parent",
        title : "LaTeX template",
        type : "normal",
        contexts : ["editable", "selection"]
    });

    chrome.storage.local.get(null, ((data) => {
        for (let title in data){
            chrome.contextMenus.create({
                id : title,
                title : title,
                type : "normal",
                parentId : parent,
                contexts : ["editable", "selection"]
            });
        }
    }));

    // ボタンが押されたら，content scriptに挿入するように言う．
    chrome.contextMenus.onClicked.addListener(function(item){
        console.log('right clicked')
        chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, item.menuItemId, function(mes){});
            console.log(item.menuItemId)
        });
    });

    // （popupからの情報で）新しいテンプレに対するコンテキストメニューを追加する．
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
        chrome.contextMenus.create({
            id : message,
            title : message,
            type : "normal",
            parentId : parent,
            contexts : ["editable"]
        });
        sendResponse("done")
    })

//   });
