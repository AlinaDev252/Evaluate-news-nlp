var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const mockAPIResponse = require("./mockAPI.js");

// Add environment variables so that my personal API key won't be public on Github
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
console.log(`Your API Key is ${process.env.API_KEY}`);
let baseUrl = [];

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.options("*", cors());

app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
	console.log("MeaningCloud app listening on port 8081!");
});

app.get("/test", function (req, res) {
	res.send(mockAPIResponse);
});

// POST route
app.post("/meaningCloud", addMeaning);

async function addMeaning(req, res) {
	baseUrl = req.body.url;
	console.log("Entered URL:", baseUrl);
	const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`;

	const response = await fetch(apiUrl);
	const meaningdata = await response.json();
	const projectData = {
		score_tag: meaningdata.score_tag,
		agreement: meaningdata.agreement,
		subjectivity: meaningdata.subjectivity,
		confidence: meaningdata.confidence,
		irony: meaningdata.irony,
	};
	console.log(projectData);
	res.send(projectData);
}
