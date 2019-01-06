var contexts = ["selection"];
var contextMenuItem = {
  "title": "SpendMoney",
  "contexts": contexts,
  "id": "spendMoney"
}

chrome.contextMenus.create(contextMenuItem);

function isInt(val) {
  return !isNaN(val) && parseInt(Number(val)) == val &&
  !isNaN(parseInt(val, 10));
}
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if(clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if(isInt(clickData.selectionText)) {
      chrome.storage.sync.get(["total", "limit"], function(budget) {
        var newTotal = 0;

        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({"total": newTotal}, function() {
          if (newTotal >= budget.limit) {
            var notifOptions = {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Budget Limit Reached",
              message: "You have reached your budget limit!"
            };
            chrome.notifications.create("limitNotif",notifOptions);
            console.log("fdgldfgd flsdnfjlld");
          }
        })
      })
    }
  }
})

chrome.storage.onChanged.addListener(function(changes, storageName) {
  chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()})
})
