function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getKeyString(x,y) {
    return `${x}x${y}`;
}

(function () {


    let playerId;
    let playerRef;


    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            //You are logged in!
        } else {
            //You are logged out.
        }

    })

    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var  errorMessage = error.message;

        console.log(errorCode, errorMessage);
    });



})();