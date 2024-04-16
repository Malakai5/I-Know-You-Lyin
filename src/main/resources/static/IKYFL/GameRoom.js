let gameID = window.location.search.replace("?","")
document.getElementById("access_code").innerText = gameID
let s3RoomList = []
let currentDisplay
let eliminatedList = new Set([])

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function deleteFromList(firstArray, secondArray){
    return firstArray.filter(x => !secondArray.has(x))
}

function changeDisplay(){
    if (s3RoomList.length === 0){
        currentDisplay = "This Hoe Empty, Y'all boring"
    }
    else if (eliminatedList.has(s3RoomList[0])){
        currentDisplay = "This Hoe Empty, Y'all boring"
    }
    else{
        currentDisplay = s3RoomList[0]
        eliminatedList.add(s3RoomList[0])
        s3RoomList = deleteFromList(s3RoomList, eliminatedList)
    }
    document.getElementById("display").innerText = currentDisplay
}

async function getRoomList(){
    let raw = JSON.stringify({
        "RequestType": "get_list",
        "room_code": gameID})
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
            s3RoomList = json.body.split("\n")
            s3RoomList = deleteFromList(s3RoomList,eliminatedList)
            shuffle(s3RoomList)
            console.log(s3RoomList)
        })}


function joinRoom(){
    let raw = JSON.stringify({
        "RequestType": "validate_room",
        "room_code": gameID})
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
                location.replace("https://afro-games/IKYFL/SubmittingPage.html?" + gameID);
            }
            else {
                alert("That code: " + gameID + " doesn't have a room.\n Either get the correct code from someone or create a brand new Room")
            }
        })

}


setInterval(getRoomList,7500)

// async function updateRoomList(){
//     let listString = s3RoomList.toString().replaceAll(",","\n")
//
//     let raw = JSON.stringify({
//         "RequestType": "update_list",
//         "room_code": gameID,
//         "data": listString})
//     let requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: raw,
//         redirect: 'follow'
//     }
//
//     fetch("https://vbqd7oew9b.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
//         .then(response => response.text())
//         .then(response => JSON.parse(response))
// }

