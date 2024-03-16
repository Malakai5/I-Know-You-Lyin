async function changeDisplay(){
    let response = await fetch("http://IPADDRESS:8000/change");
}

async function getDisplay(){
    let result = document.getElementById("display");
    let response =  await fetch("http://IPADDRESS:8000/display")
    result.innerText = await response.text()
}

async function addEntry() {
    let textEntry = document.getElementById("submission")

    if (textEntry.value.trim().length !== 0) {
        await fetch("http://IPADDRESS:8000/input?entry=" + textEntry.value);
        window.location.href = "AnswerSubmitted.html";
    } else alert("Put something ya dingus")
}

//
// let timeLeft = 30;
// let elem = document.getElementById('timer');

// function countdown() {
//
//     if (timeLeft === -1) {
//         clearTimeout(timerId);
//         let mySound = new Audio("src/main/resources/whatDaDogDoin.mp3")
//         mySound.play()
//     } else {
//         elem.innerText = timeLeft + ' seconds remaining';
//         timeLeft--;
//     }
// }
//
// function startTimer(){
//     elem.innerText = '30 seconds remaining';
//     timeLeft = 30;
//     timerId = setInterval(countdown, 1000);
//
//
// }
//
// setInterval(getDisplay,500)
