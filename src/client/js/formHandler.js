import { urlCheck } from "./urlChecker";
import axios from "axios";

const handleSubmit = async (e) => {
	e.preventDefault();

	let url = document.getElementById("urlInput").value;
	console.log("::: Form Submitted :::");
	console.log("User's URL input is: ", url);

	if (urlCheck(url) == true) {
		axios
			.post("/meaningAPI", { url: url })
			.then((res) => updateUI(res.data))
			.catch((error) => console.log("Error", error));
	} else {
		alert("Invalid URL! Please provide another one!");
	}
};

const updateUI = async (response) => {
	document.getElementById("polarity").innerHTML = "Polarity: " + response.score_tag;
	document.getElementById("agreement").innerHTML = "Agreement: " + response.agreement;
	document.getElementById("subjectivity").innerHTML = "Subjectivity: " + response.subjectivity;
	document.getElementById("confidence").innerHTML = "Confidence: " + response.confidence;
	document.getElementById("irony").innerHTML = "Irony: " + response.irony;
};

export { handleSubmit, updateUI };
