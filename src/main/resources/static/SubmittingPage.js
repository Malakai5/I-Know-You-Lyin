// let gameID = window.location.search.replace("?","")
let gameID = "UPJT3H"
async function enterSubmission(data){
    let raw = JSON.stringify({
        "RequestType": "write_info",
        "room_code": gameID,
        "data": data})
    let requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    }
    if (data.trim().length >= 3 ){
        fetch("https://vbqd7oew9b.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(json => {
                if (json.statusCode === 200){
                    alert("Submitted!!\nFeel free to add some more stuff")
                    document.getElementById("submission").value = ""
                }
                else{
                    alert("Nah we don't like that one fam")
                }
            })
    }
    else{
        alert("Three letters or more please")
    }

}

document.getElementById("submit").addEventListener("click",
    () =>
        enterSubmission((document.getElementById("submission").value.trim())))