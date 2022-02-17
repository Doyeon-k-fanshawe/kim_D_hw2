(() => {
	// make the connections to the elements on the page
	// that we want the user to interact with
	let theThumbnails = document.querySelectorAll("#buttonHolder img"),
			puzzlePieces = document.querySelectorAll(".puzzle-pieces *"),
			dropZones = document.querySelectorAll(".drop-zone"),
			theGameBoard = document.querySelector(".puzzle-board");

	const piecePaths = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

			// theLink = document.querySelector("a")
			//theLink.addEventListener('click', function(event) { event.preventDefault();})

	// theThumbnails collects all of the image elements into an array-like co
	// theButtons becomes this:
	// [
	// <img scr="images/buttonZero.jpg" alt="thumbnail">
	// <img scr="images/buttonOne.jpg" alt="thumbnail">
	// <img scr="images/buttonTwo.jpg" alt="thumbnail">
	// <img scr="images/buttonThree.jpg" alt="thumbnail">
	// ]
	//

	function changeBgImgSet() {
		// debugger; //pause our code execution at this point
		// way 1 ------------------------
		// let key = this.dataset.bgref;
		// console.log(key);

		// theGameBoard.style.backgroundImage = `url(images/backGround${key}.jpg)`;
		// ------------------------------------------------------------------------- //
		// way 2 -----------------------------------------------------------------------------//
		theGameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

		// `` => this is a javascript templete string. You can use it to wite a bit of inline javascript with will be interpreted at runtime
		// search for MDN Javascript Templete String

		piecePaths.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgref}.jpg`;
		})
	}

	function startDrag(event) {
		// save a reference to the element we're dragging
		event.dataTransfer.setData("draggedElement", event.target.id);
	}

	function draggedOver(event) {
		// event is the user event ( a click, a drag, a drop)
		// soem elements have default behaviour (like an anchor tag) -> we need to block that behaviour
		// and script our own
		// that's what event.preventDefault() does -> override the default behaviour (block it)
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();
		let currentEl = event.dataTransfer.getData("draggedElement");
		console.log(`dropped this element:`, currentEl);

		// appendChild (add child) is a built-in JavaScript method that adds an element to a containing (parent) element

		// the "this" keyword is a reference to the element you're dropping onto (or into)
		this.appendChild(document.querySelector(`#${currentEl}`));
	}

	// add event hadnling here -> loop through theThumbnails array and add event handling to each image
	// these are the "triggers" we want the user to use to fire  off events
	theThumbnails.forEach(button => button.addEventListener("click", changeBgImgSet));
	puzzlePieces.forEach(piece => piece.addEventListener("dragstart", startDrag));

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
	});
})();
