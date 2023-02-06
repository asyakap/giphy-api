import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getGiphy(search) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=25&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
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

function getGiphy1() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements1(response);
    } else {
      // there's a new argument
      printError1(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getGiphy2() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&limit=25&offset=0&rating=g&lang=en`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements2(response);
    } else {
      // there's a new argument
      printError2(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, search) {
  document.querySelector('#showResponse').innerText = `There was an error accessing GIPHY ${search}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printError1(request, apiResponse, search) {
  document.querySelector('#showTranding').innerText = `There was an error accessing GIPHY ${search}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printError2(request, apiResponse, search) {
  document.querySelector('#showRandom').innerText = `There was an error accessing GIPHY ${search}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(response) {
  document.querySelector('#showResponse').src = response.data[0].images.downsized.url;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  getGiphy(search);
}

function printElements1(response) {
  document.querySelector('#showTranding').src = response.data[0].images.downsized.url;
}

function handleFormSubmission1(event) {
  event.preventDefault();
  getGiphy1();
}

function printElements2(response) {
  console.log(response.data.images.downsized.url);
  document.querySelector('#showRandom').src = response.data.images.downsized.url;
}

function handleFormSubmission2(event) {
  event.preventDefault();
  getGiphy2();
}


window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.getElementById('tranding').addEventListener("click", handleFormSubmission1);
  document.getElementById('random').addEventListener("click", handleFormSubmission2);
});

