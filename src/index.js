import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getGiphy(search) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=25&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response, search);
    } else {
      // there's a new argument
      printError(this, response, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, search) {
  document.querySelector('#showResponse').innerText = `There was an error accessing GIPHY ${search}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(response) {
  console.log(response.data[0].images.downsized.url);
  document.querySelector('#showResponse').src = response.data[0].images.downsized.url;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  getGiphy(search);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

