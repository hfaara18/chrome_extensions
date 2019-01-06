chrome.tab.query({active:true, currentWindow:true}, function(tabs) {
  chrome.pageAction.show(tabs[0].id)
})
