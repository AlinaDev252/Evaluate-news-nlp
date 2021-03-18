var path = require("path");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");

// Add environment variables so that my personal API key won't be public on Github
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

// GET request
app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
});

// Designates what port the app will listen to for incoming requests
app.listen(8085, function () {
	console.log("MeaningCloud app listening on port 8085!");
});

app.get("/test", function (req, res) {
	res.send(mockAPIResponse);
});

//POST request
app.post("/meaningAPI", (req, res) => {
	axios.post(`http://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`).then((response) => {
		res.send(response.data);
		console.log(response.data);
	});
});
