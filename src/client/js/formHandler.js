import { urlCheck } from "./urlChecker";

function handleSubmit(event) {
	event.preventDefault();

	const baseURL = "http://localhost:8081/meaningAPI";
	const url = document.getElementById("urlInput").value;
	console.log("User's URL input is: ", url);

	// Check if URL valid or not
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
			.then(function (res) {
				//posts the retrieved data to the webpage
				console.log(res);
				document.getElementById("polarity").innerHTML = `Polarity: ${res.score_tag}`;
				document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
				document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
				document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
				document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
			})
			.catch((error) => {
				console.log(" an error", error);
			});
	} else {
		alert("Ooops! Invalid URL! Please provide another one!");
	}
}

export { handleSubmit };
