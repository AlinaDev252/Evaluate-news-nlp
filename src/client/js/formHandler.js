import { urlCheck } from "./urlChecker";

function handleSubmit(e) {
	e.preventDefault();

	const baseURL = "/meaningAPI";
	const url = document.getElementById("urlInput").value;
	console.log("User's URL input is: ", url);

	// Check if URL valid or not
	// if (urlCheck(url) == true) {
	if (urlCheck(url)) {
		fetch(baseURL, {
			//sends the user's URL to the server for the API to use
			method: "POST",
			credentials: "same-origin",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: url }),
		})
			.then((res) => res.json())
			.then((res) => {
				// posts the retrieved data to the webpage
				console.log(res);
				document.getElementById("polarity").innerHTML = `Polarity: ${res.score_tag}`;
				document.getElementById("polarity").innerHTML = `Agreement: ${res.agreement}`;
				document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
				document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
				document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
				updateUI(res);
				console.log(res);
			})
			.catch((error) => {
				console.log("Invalid URL", error);
			});
	} else {
		alert("Ooops! Invalid URL! Please provide another one!");
	}
}

export { handleSubmit };
