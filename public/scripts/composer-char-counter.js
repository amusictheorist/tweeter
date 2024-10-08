$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const text = $(this).val();
    const length = text.length;
    const remaining = 140 - length;
    const counter = $(this).siblings().children().eq(1);
    $(counter).text(remaining);
    if (remaining < 0) {
      $(counter).addClass("warning");
      return
    }

    $(counter).removeClass("warning");
  })

});
