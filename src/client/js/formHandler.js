import { urlCheck } from "./urlChecker";
import axios from "axios";

const handleSubmit = async () => {
	let url = document.getElementById("urlInput").value;
	console.log("::: Form Submitted :::");
	console.log("User's URL input is: ", url);

	if (urlCheck(url) == true) {
		axios
			.post("/meaningAPI", { url: url })
			.then(() => updateUI())
			.catch((error) => console.log("Error", error));
	} else {
		alert("Invalid URL! Please provide another one!");
	}
};

const updateUI = async () => {
	axios
		.get("/")
		.then((response) => {
			document.getElementById("polarity").innerHTML = "Polarity: " + response.score_tag;
			document.getElementById("agreement").innerHTML = "Agreement: " + response.agreement;
			document.getElementById("subjectivity").innerHTML = "Subjectivity: " + response.subjectivity;
			document.getElementById("confidence").innerHTML = "Confidence: " + response.confidence;
			document.getElementById("irony").innerHTML = "Irony: " + response.irony;
		})
		.catch((error) => console.log("Error", error));
};

// 	// Check if URL valid or not
// 	// if (urlCheck(url) == true) {
// 	if (urlCheck(url)) {
// 		fetch(baseURL, {
// 			//sends the user's URL to the server for the API to use
// 			method: "POST",
// 			credentials: "same-origin",
// 			mode: "cors",
// 			cache: "no-cache",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ url: url }),
// 		})
// 			.then((res) => res.json())
// 			.then((res) => {
// 				// posts the retrieved data to the webpage
// 				console.log(res);
// 				document.getElementById("polarity").innerHTML = `Polarity: ${res.score_tag}`;
// 				document.getElementById("polarity").innerHTML = `Agreement: ${res.agreement}`;
// 				document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
// 				document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
// 				document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
// 				updateUI(res);
// 				console.log(res);
// 			})
// 			.catch((error) => {
// 				console.log("Invalid URL", error);
// 			});
// 	}else {
// 		alert("Ooops! Invalid URL! Please provide another one!");
// 	}
// }

export { handleSubmit };
