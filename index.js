'use strict';

function getDogImage(count) {
  // create a url variable to build
  let url = ``;
  // javascript fallback if HTML5 form validation isn't supported.
  // if input isn't a number, or is < 1, or is > 50, display an input validation error
  if (isNaN(count) || count < 1 || count > 50 ) {
    displayResults(null, null);
  } 
  // if the input passes validation tests, set the url variable and fetch the images
  else {
    url += `https://dog.ceo/api/breeds/image/random/${count}`;
    fetch(url)
    .then(response => {
      if(!response.ok)
        // if the response comes back without a 200 status, throw a new error
        throw new Error(response.status);
      // otherwise, return the response.json() in the promise
      return response.json();
    })
    // with a 200 status, display the results
    .then(responseJson => {
      displayResults(responseJson, null)
    })
    // if not a 200 status, catch the thrown error and display the error to the user     
    .catch(error => {
      displayResults(null, error);
    }) 
  }
}

function displayResults(responseJson, error) {
  // clear the previous results
  $('.results').html('');
  // Display the input validation error. They must enter a number between 1 and 50 inclusive
  if (responseJson === null && error === null) {
    $('.results').html(`<h2>Error! Please input a <u>NUMBER</u> between 1 and 50`);
  } 
  // Display the response error
  else if (responseJson !== null && error !== null) {
    $('.results').html(`<h2>Error! ${error.toString}</h2>`)
  } 
  // If there is a response and the status is 200 ok, then add images to DOM
  else {
    responseJson.message.forEach(imgSrc => {
      $('.results').append(`<img src="${imgSrc}" class="results-img">`
      )
    })
    // change h2 text feedback for user about the number of dogs images they got
    $('.results').prepend(`<h2>wow - such response - much doge<br>displaying ${responseJson.message.length} dog images</h2>`);
  }
  // display the results section, which includes text feedback and the images
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    // grab the value of the number input box
    let count = $('form').find('#count').val();
    // fetch the images from the Dog API
    getDogImage(count);
  });
}

$(function() {
  // attach an event listener to the input form
  watchForm();
});