/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {
  $('#submit-tweet').on('submit', handleTweetSubmission);
});

const handleTweetSubmission = (event) => {
  event.preventDefault();
  
  const tweet = $('#submit-tweet').serialize();
  $.ajax({
    type: 'POST',
    url: '/tweets',
    data: tweet,
    success: (res) => {
      console.log('Success: ', res);
    },
    error: (error) => {
      console.error('Error: ', error);
    }
  });
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweetObj) {
  const user = tweetObj.user;
  const content = tweetObj.content;
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
          <div class="tweet-date">${tweetObj.created_at}</div>
          <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
        </footer>
      </article>
      `);
  return $tweet;
};

const renderTweets = function(tweetArr) {
  for (const tweetObj of tweetArr) {
    let $tweet = createTweetElement(tweetObj);
    $('#tweets-container').prepend($tweet);
  }
};

renderTweets(data);