$(function() {
  $("#saveLimit").click(function() {
    var limit = $("#limit").val();

    if(limit) {
      chrome.storage.sync.set({"limit": limit}, function() {
        close();
      });
    }
  });
  $("#resetTotal").click(function() {
    chrome.storage.sync.set({"total": 0}, function() {
      var resetOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Total Has Been Reset",
        message: "You have reset your total spending!"
      };
      chrome.notifications.create("restNotif",resetOptions);
    });
  })
})
