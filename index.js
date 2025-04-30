const gridContainer = document.querySelector("#grid-container");
const setGridButton = document.querySelector("#set-grid-btn");
const warningText = document.querySelector("#warning");
const squaresFullyDarkenedTxt = document.querySelector("#squares-fully-darkened-txt");
const squaresFullyDarkenedNum = document.querySelector("#squares-fully-darkened");
const totalNumOfSquaresToColorAndDarken = document.querySelector("#total")
const totalNumOfSquaresToColorAndDarkenTxt = document.querySelector("#total-to-color-text");
let squaresPerSide = 16;

const MAX_WIDTH = 960;
const MAX_RGB_VALUE = 256

let grid = [];
let squaresFullyDarkened = 0;

squaresFullyDarkenedTxt.textContent = `Cells fully darkened and colored :`;
totalNumOfSquaresToColorAndDarkenTxt.textContent = `Total number of cells`;

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
    grid = [];
    totalNumOfSquaresToColorAndDarken.textContent = `${rows * cols}`;
    for (let i = 0; i < rows; ++i){
        let gridRowBool = [];
        const gridRow = document.createElement('div');
        for (let j = 0; j < cols; ++j){
            const gridCol = document.createElement('div');
            gridCol.style.width = `${cellWidth}px`;
            gridCol.style.height = `${cellWidth}px`;
            gridCol.style.opacity = "0.1";
            gridCol.id = `${i}:${j}`;
            gridCol.style.border = "2px solid #000";
            gridCol.classList.add("color-change");
            gridRow.appendChild(gridCol);
            gridRowBool.push(false);
        }
        gridContainer.appendChild(gridRow);
        grid.push(gridRowBool);
    }
    gridContainer.addEventListener("mouseover", function(e){
        const target = e.target;
        if (target.tagName === "DIV") {
            target.style.backgroundColor = randomRGB();
            let dimensions = target.id.split(":").map(val => +val);
            let x = dimensions[0];
            let y = dimensions[1]
            if (+(target.style.opacity) >= 1){
                if (grid[x][y] === false) {
                    grid[x][y] = true;
                    squaresFullyDarkenedNum.textContent = `${++squaresFullyDarkened}`;
                    target.textContent = "Set";
                    target.classList.add("grid-cell");
                }
            } else {
                target.style.opacity = `${+target.style.opacity + 0.1}`;
            }
        }
    })

    gridContainer.addEventListener("mouseout", function(e){
        function setDelay(){
            e.target.style.backgroundColor = "#fff";
        }

        setTimeout(setDelay, 250);
    })
    squaresFullyDarkened = 0;
    squaresFullyDarkenedNum.textContent = `${squaresFullyDarkened}`;
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