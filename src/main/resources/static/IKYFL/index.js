let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
quickCheck()
async function quickCheck(){
    let raw = JSON.stringify({"RequestType": "check_rooms"});
    let requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    fetch("https://vbqd7oew9b.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");

    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

function showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
    }
    else {
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        // document.getElementById("entryForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function createNewRoom(){
    let agreed = false
    if (confirm("You're cool with creating a brand new room")) {
        agreed = true;
    }
    if (agreed){
        let roomID = makeID(6)

        let raw = JSON.stringify({
            "RequestType": "create_room",
            "room_code": roomID});
        let requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };


        fetch("https://vbqd7oew9b.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(json => {
                console.log(json)
                if (json.statusCode === 200){
                    alert("Here's your room code: " + roomID)
                    location.replace("https://afro-games/IKYFL/GameRoom.html?" + roomID);
                }
            })
    }
}

function joinRoom(){
    let roomCode = prompt("What's your room's Code?");

    let raw = JSON.stringify({
        "RequestType": "validate_room",
        "room_code": roomCode})
    let requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    }

    fetch("https://vbqd7oew9b.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(json => {
            console.log(json)
            if (json.body === true){
                alert("Have fun in your room!!")
                location.replace("https://afro-games/IKYFL/SubmittingPage.html?" + roomCode);
            }
            else {
                alert("That code: " + roomCode + " doesn't have a room.\n Either get the correct code from someone or create a brand new Room")
            }
        })

}

