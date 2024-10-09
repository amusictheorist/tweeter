$(document).ready(function() {

  $("#tweet-text").on("keyup", function() {
    const text = $(this).val();
    const length = text.length;
    const remaining = 140 - length;
    const counter = $(this).closest("form").find("output");
    
    $(counter).text(remaining);
    if (remaining < 0) {
      $(counter).addClass("warning");
      return
    }

    $(counter).removeClass("warning");
  })

});
