var path = require("path");
var axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
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
app.listen(80, function () {
	console.log("MeaningCloud app listening on port 80!");
});

app.get("/test", function (req, res) {
	res.send(mockAPIResponse);
});

const request = require("request");
//POST request
app.post("/meaningAPI", (req, res) => {
	const url = req.body.url;
	getSentiment(url, apiKey, (data) => {
		console.log(data);
		res.send(data);
	});
});

const getSentiment = (url, key, callback) => {
	request(
		`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${url}`,
		{
			json: true,
		},
		(err, res, body) => {
			if (!err && res.statusCode == 200) {
				callback(body);
			} else {
				console.log(error);
			}
		}
	);
};
