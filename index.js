const gridContainer = document.querySelector("#grid-container");
const setGridButton = document.querySelector("#set-grid-btn");
const warningText = document.querySelector("#warning");
let squaresPerSide = 16;

const MAX_WIDTH = 960;
const MAX_RGB_VALUE = 256

function randomColorChannel(){
    return Math.floor(Math.random() * MAX_RGB_VALUE);
}

function randomRGB(){
    const r = randomColorChannel()
    const g = randomColorChannel()
    const b = randomColorChannel()
    return `rgb(${r}, ${g}, ${b})`
}

function makeTheGrid(rows, cols) {
    let cellWidth = MAX_WIDTH / rows;
    for (let i = 0; i < rows; ++i){
        const gridRow = document.createElement('div');
        for (let j = 0; j < cols; ++j){
            const gridCol = document.createElement('div');
            gridCol.style.width = `${cellWidth}px`;
            gridCol.style.height = `${cellWidth}px`;
            gridCol.style.opacity = "0.1";
            gridCol.style.border = "2px solid #000";
            gridCol.classList.add("color-change");
            gridRow.appendChild(gridCol);
        }
        gridContainer.appendChild(gridRow);
    }
    gridContainer.addEventListener("mouseover", function(e){
        const target = e.target;
        if (target.tagName === "DIV") {
            target.style.backgroundColor = randomRGB();
            target.style.opacity = `${+target.style.opacity + 0.1}`;
        }
    })

    gridContainer.addEventListener("mouseout", function(e){
        function setDelay(){
            e.target.style.backgroundColor = "#fff";
        }

        setTimeout(setDelay, 250);
    })
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