async function addEntry() {
    let textEntry = document.getElementById("submission")

    if (textEntry.value.trim().length !== 0) {
        await fetch("http://192.168.1.96:8000/input?entry=" + textEntry.value);
        window.location.href = "AnswerSubmitted.html";
    } else alert("Put something ya dingus")
}

let submitButton = document.getElementById("submit")
submitButton.addEventListener("click",addEntry)