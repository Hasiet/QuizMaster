let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "belgium",
  "bhutan",
  "brazil",
  "china",
  "cuba",
  "ecuador",
  "georgia",
  "germany",
  "hong-kong",
  "india",
  "iran",
  "myanmar",
  "norway",
  "spain",
  "sri-lanka",
  "sweden",
  "switzerland",
  "united-states",
  "uruguay",
  "wales",
];
let count = 0;
let Mistake = 0 ;

//Generating Random County Flag Names 
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

//Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];

  //for string random values in array
  for (let i = 1; i <= 4; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      //If value already exists then decrement i by 1
      i -= 1;
    }
  }

  // Gerating 4 country names witch is used for selecting image as an id
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    flagDiv.innerHTML = `<img src="./Flags/${i}.png" id="${i}">`;
    dragContainer.appendChild(flagDiv);
  }

  //Sort the array randomly before creating country divs. Creates names that matches with flag images, but in diferent order
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const CountryNameDiv = document.createElement("div");
    CountryNameDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    dropContainer.appendChild(CountryNameDiv);
  }
};


//Function that runs the code
const startGame = async () => {
  currentElement = "";
  controls.classList.add("hide");
  startButton.classList.add("hide");

  //This will wait for creator to create the images and then move forward
  await creator();
  dropPoints = document.querySelectorAll(".countries");
  draggableObjects = document.querySelectorAll(".draggable-image");

  //When draggable element is selected it gets the id of that name
  draggableObjects.forEach((element) => {
    element.addEventListener("dragstart", function(e) {
      e.dataTransfer.setData("text", e.target.id);
      
      
    });
  });

  //When draggable element is dropped to the container, it gets the id of that space
  dropPoints.forEach((element) => {
    element.addEventListener("dragover", function(e){
      e.preventDefault();
    });
    element.addEventListener("drop", function(e){
      e.preventDefault();
      const draggedElementData = e.dataTransfer.getData("text");
      const droppableElementData = e.target.getAttribute("data-id");
      console.log(draggedElementData);
      console.log(droppableElementData);
      e.target.innerHTML = ``;
      const draggedElement = document.getElementById(draggedElementData);

      //insert the img to the container
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="./Flags/${draggedElementData}.png" id="${draggedElementData}" draggable = "false">`
      );

      //hide current img
      draggedElement.classList.add("hide");

      //draggable set to false
      draggedElement.setAttribute("draggable", "false");
      
      //when the img and the sapce mathces
      if (draggedElementData === droppableElementData) {
      //dropped class, it changes the color to green when dropped
        e.target.classList.add("dropped");
      }

      //if it doesn't
      else if(draggedElementData != droppableElementData){
        e.target.classList.add("droppedFalse");
        Mistake++;

      }
      count += 1;
      console.log(count, Mistake);

      //you won
      if(count == 4){
        if (Mistake ==0) {
          console.log("You Won!");
          result.innerText = "You Won!";
          stopGame();
        }

        //you lost
        else if(Mistake>0){
          console.log("You Lost!");
          result.innerText = "You Lost!";
          startButton.innerHTML = "Try Again!";
          stopGame();

        }
      } 
    });
    
  });

}

//after finishing the game
function Restart(){
  location.reload();
}

//after webpage is loaded
window.addEventListener(
  'load', 
  startGame()
)

//stop game function
const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};