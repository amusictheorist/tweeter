// helper functions for client.js

const showError = function(selector, message) {
  $(selector).text(message).slideDown();
};

const hideError = function(selector) {
  $(selector).slideUp();
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

  module.exports = { showError, hideError, escape, createTweetElement, renderTweets, loadTweets };