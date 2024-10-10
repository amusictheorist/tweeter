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
  
  const data = $(this).serialize();
  console.log(data);
  $.post("/tweets", data)
  .then(()=> {
    loadTweets();
    $("#tweet-text").val("");
    console.log("Success");
  })
  .catch(err => {
    console.log(err.message);
  })
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
        <p class="tweet-text">${content.text}</p>
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
  } else {
    console.log("No time elements found");
  }
};

const loadTweets = () => {
  $.get("/tweets")
  .then(data => {
    renderTweets(data)
  })
  .catch(err => {
    console.log(err.message);
  })
};

loadTweets();