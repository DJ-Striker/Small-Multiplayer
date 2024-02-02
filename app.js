//Options for Player Colors
const playerColors = ["blue", "red", "yellow", "green", "purple"];


function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getKeyString(x,y) {
    return `${x}x${y}`;
}

function createName() {
  const prefix = randomFromArray([
    "COOL",
    "SUPER",
    "HIP",
    "SMUG",
    "COOL",
    "SILKY",
    "GOOD",
    "SAFE",
    "DEAR",
    "DAMP",
    "WARM",
    "RICH",
    "LONG",
    "DARK",
    "SOFT",
    "BUFF",
    "DOPE",
  ]);
  const animal = randomFromArray([
    "BEAR",
    "DOG",
    "CAT",
    "FOX",
    "LAMB",
    "LION",
    "BOAR",
    "GOAT",
    "VOLE",
    "SEAL",
    "PUMA",
    "MULE",
    "BULL",
    "BIRD",
    "BUG",
  ]);
  return `${prefix} ${animal}`;
}

(function () {


    let playerId;
    let playerRef;
    let playerElements = {};

    const gameContainer = document.querySelector(".game-container");

    function initGame() {
        const allPlayersRef = firebase.database().ref(`players`);
        const allCoinsRef = firebase.database().ref(`coins`);

        allPlayersRef.on("value", (snapshot) => {
            //Fires whenever a change occurs
        })
        allPlayersRef.on("child_added", (snapshot) => {
            //Fires whenever a new node is added on the tree
            const addedPlayer = snapshot.val();
            const characterElement = document.createElement("div");
            characterElement.classList.add("Character", "grid-cell");
            if (addedPlayer.id == playerId) {
                characterElement.classList.add("you");
            }
            characterElement.innerHTML = (`
                <div class = "Character_Shadow grid-cell"></div>
                <div class = "Character_Sprite grid-cell"></div>
                <div class = "Character_Name-container">
                    <span class = "Character_Name"></span>
                    <span class = "Character_Coins">0</span>
                </div>
                <div class = "Character_You-arrow"></div>
            `);

            playerElements[addedPlayer.id] = characterElement;
            //Fill in some initial state

            characterElement.querySelector(".Character_Name").innerText = addedPlayer.name;
            characterElement.querySelector(".Character_Coins").innerText = addedPlayer.coins;
            characterElement.setAttribute("data-color", addedPlayer.color);
            characterElement.setAttribute("data-direction", addedPlayer.direction);
            const left = 16 * addedPlayer.x + "px";
            const right = 16 * addedPlayer.y - 4 + "px";
            characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameContainer.appendChild(characterElement);
        })




    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            //You are logged in!
            playerId = user.uid;
            playerRef = firebase.database().ref(`players/${playerId}`);

            const name = createName();

            playerRef.set({
                id: playerId,
                name,
                direction: "right",
                color: randomFromArray(playerColors),
                x: 3,
                y: 3,
                coins: 0,
            })

            //Remove player from firebase
            playerRef.onDisconnect().remove();

            //Begin the Game
            initGame();
        } else {
            //You are logged out
        }

    })


    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var  errorMessage = error.message;

        console.log(errorCode, errorMessage);
    });



})();