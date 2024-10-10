/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {
  $("#submit-tweet").on("submit", handleTweetSubmission);
  loadTweets();
});

const handleTweetSubmission = function(event) {
  event.preventDefault();

  const tweetContent = $("#tweet-text").val().trim();

  if (tweetContent === "") {
    $("#empty-tweet").text("Your tweet is empty!").slideDown();
  } else {
    $("#empty-tweet").slideUp();
  }
  
  if (tweetContent.length > 140) {
    $("#tweet-length").text("Your tweet must be between 1 and 140 characters!").slideDown();
  } else {
    $("#tweet-length").slideUp();
  }

  if (tweetContent && tweetContent.length <= 140) {
    const data = $(this).serialize();
    console.log(data);
    $.post("/tweets", data)
    .then(() => {
      loadTweets();
      $("#tweet-text").val("");
      console.log("Success");
    })
    .catch(err => {
      alert("An error occurred while submitting the tweet. Please try again.");
    })
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const user = tweetObj.user;
  const content = tweetObj.content;
  const createdAt = tweetObj.created_at;
  const $tweet = $(`
    <article class="tweet">
        <header class="tweet-header">
          <div class="author-info">
            <img src=${user.avatars}>
            <span class="tweet-author">${user.name}</span>
          </div>
          <div class="author-handle">${user.handle}</div>
        </header>
        <p class="tweet-text">${escape(content.text)}</p>
        <hr/>
        <footer class="tweet-footer">
        <time class="timeago" datetime="${new Date(createdAt).toISOString()}"></time>
          <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
        </footer>
      </article>
      `);
  return $tweet;
};

const renderTweets = function(tweetArr) {
  const container = $(".tweets-container");
  container.empty();
  for (const tweetObj of tweetArr) {
    let $tweet = createTweetElement(tweetObj);
    container.prepend($tweet);
  }
  const timeagoElements = $(".timeago").get();
  if (timeagoElements.length > 0) {
    timeago.render(timeagoElements);
  }
};

const loadTweets = () => {
  $.get("/tweets")
  .then(data => {
    renderTweets(data)
  })
  .catch(err => {
    alert("An error occurred while loading the tweets. Please refresh the page.");
  })
};