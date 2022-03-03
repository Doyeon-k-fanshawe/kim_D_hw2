(() => {

	let theThumbnails = document.querySelectorAll("#buttonHolder img"),
			puzzlePieces = document.querySelectorAll(".puzzle-pieces *"),
			dropZones = document.querySelectorAll(".drop-zone"),
			theGameBoard = document.querySelector(".puzzle-board"),
			resetButton = document.getElementById("reset");

	const piecePaths = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeBgImgSet() {
		theGameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
		piecePaths.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgref}.jpg`;
		})

		resetPuzzlePieces();
	}

	function startDrag(event) {
		event.dataTransfer.setData("draggedElement", event.target.id);
	}

	function draggedOver(event) {
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();
		let currentEl = event.dataTransfer.getData("draggedElement");
		console.log(`dropped this element:`, currentEl);


		var thisZoneCount = document.getElementsByClassName(this.className)[0].childElementCount;
		if(thisZoneCount == 0){
			this.appendChild(document.querySelector(`#${currentEl}`));
		}else{
			event.preventDefault();
		}
	}

	function resetPuzzlePieces(){
		var puzzleZoen = document.getElementsByClassName("puzzle-pieces")[0];

		if(dropZones[0].childElementCount > 0){
			puzzleZoen.append(dropZones[0].children[0]);
		}
		if(dropZones[1].childElementCount > 0){
			puzzleZoen.append(dropZones[1].children[0]);
		}
		if(dropZones[2].childElementCount > 0){
			puzzleZoen.append(dropZones[2].children[0]);
		}
		if(dropZones[3].childElementCount > 0){
			puzzleZoen.append(dropZones[3].children[0]);
		}
	}


	theThumbnails.forEach(button => button.addEventListener("click", changeBgImgSet));
	puzzlePieces.forEach(piece => piece.addEventListener("dragstart", startDrag));

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
		});

	resetButton.addEventListener("click", () => {
		location.reload();
		})

})();
