$(document).ready(function() {
  console.log("*** test");

  $("#tweet-text").on("input", function() {
    const text = $(this).val();
    const length = text.length;
    const remaining = 140 - length;

    $(".counter").text(remaining);
    if (remaining < 0) {
      $(".counter").addClass("warning");
      return
    }

    $(".counter").removeClass("warning");
  })

});
