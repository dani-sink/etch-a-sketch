const gridContainer = document.querySelector("#grid-container");
const setGridButton = document.querySelector("#set-grid-btn");
const warningText = document.querySelector("#warning");
let squaresPerSide = 16;

let maxWidth = 960;

function makeTheGrid(rows, cols) {
    let cellWidth = maxWidth / rows;
    for (let i = 0; i < rows; ++i){
        const gridRow = document.createElement('div');
        for (let j = 0; j < cols; ++j){
            const gridCol = document.createElement('div');
            gridCol.style.width = `${cellWidth}px`;
            gridCol.style.height = `${cellWidth}px`;
            gridCol.style.border = "2px solid #000";
            gridCol.classList.add("color-change");
            gridRow.appendChild(gridCol);
        }
        gridContainer.appendChild(gridRow);
    }
    
}



setGridButton.addEventListener("click", function(e){
    const userChoice = +prompt("Number of squares per side ? Choose a number between 1-100")
    if (Number.isInteger(userChoice) && userChoice > 0 && userChoice <= 100) {
        squaresPerSide = userChoice;
        gridContainer.innerHTML = "";
        warningText.textContent = "";
        makeTheGrid(squaresPerSide, squaresPerSide)
    } else {
        warningText.textContent = "Enter a valid number between 1-100";
        warningText.style.color = "red";
        warningText.style.fontWeight = "bold";
    }
});


makeTheGrid(squaresPerSide, squaresPerSide);