$(document).ready(() => {

	let animals = ["cat", "horse", "dog", "fish"];

	$("#add-animal").on("click", function(event) {
		event.preventDefault();
		let animal = $("#animal-input").val().trim();
		$("#animal-input").val("");
		animals.push(animal);
		renderButtons();
	});

	function renderButtons() {
		let buttonDiv = $("#buttons").empty();
		animals.forEach((value, index) => {
			buttonDiv.append($("<button>")
				.text(value)
				.addClass("animal-button"));
		});
	}

	$("#buttons").on("click", ".animal-button", function() {
		$("#gifs").empty();
		let btn = $(this);

		let queryURL = "https://api.giphy.com/v1/gifs/search" + 
			"?api_key=oN5N5nfVB5JFrvXamobIf4S9TTbt6d3F" +
			"&limit=10" +
			"&q=" + btn.text();

		$.get(queryURL).then((response) => {

			console.log(response);

			let gifs = response.data;

			gifs.forEach((value, index) => {

				let animalDiv = $("<div>").addClass("animal-div");

				let gif = $("<img>")
					.attr("src", value.images.fixed_height_still.url)
					.attr("alt", value.title)
					.attr("data-playing", "still")
					.attr("data-gifURL", value.images.fixed_height.url)
					.attr("data-stillURL", value.images.fixed_height_still.url)
					.addClass("animal-gif");

				let rating = $("<p>").text("rating: " + value.rating);

				animalDiv.append(gif).append(rating);

				$("#gifs").append(animalDiv);
			});
		});
	});

	$("#gifs").on("click", ".animal-gif", function() {

		let btn = $(this);

		if(btn.attr("data-playing") === "still"){
			btn.attr("data-playing", "gif");
			btn.attr("src", btn.attr("data-gifURL"));
		}else {
			btn.attr("data-playing", "still");
			btn.attr("src", btn.attr("data-stillURL"));
		}

	});

	renderButtons();
});