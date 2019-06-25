// require cheerio to parse HTML and axios to make requests for HTML pages

const cheerio = require("cheerio");
const axios = require("axios");

// Tell the console what the server.js file is doing

console.log("Scraping for coffee listings...");

// Make request via axios

axios
  .get(
    "https://kuntzcoffee.com/we-accept-paypal-or-any-major-credit-card-at-checkout-and-we-charge-a-flat-rate-of-5-99-to-ship-each-order/"
  )
  .then(function(response) {
    const $ = cheerio.load(response.data);
    const coffees = [];

    // Find each li tag with the class "product"

    $("li.product").each(function(index, element) {
      //Save what it grabs in a variable
      const coffName = $(element)
        .find("a")
        .find("h2")
        .text();

      const img = $(element)
        .find("a")
        .find("img")
        .attr("src");

      // Push the info to the array
      coffees.push({
        title: coffName,
        image: img
      });
    });
    console.log(coffees);
  });
