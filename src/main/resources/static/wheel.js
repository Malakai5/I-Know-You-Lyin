let wantedItem;
let options = [];

function trimElement(temp){
    temp = temp.replace("\"","");
    temp = temp.replace("\"","");
    temp = temp.replace("[","");
    temp = temp.replace("]","");
    return temp;
}

async function fillWheel(){
    let response = await fetch("http://192.168.1.96:8000/submissions");
    let submissions = response.text()

    let temp = (await submissions).split(",")
    temp.forEach(element => options.push(trimElement(element)));
}

fillWheel();

async function deleteSubmission(){
    wantedItem = options[Math.floor(Math.random() * options.length)];
    document.getElementById("result").innerText = wantedItem
    await fetch("http://192.168.1.96:8000/chosen?selected=" + wantedItem);
    options = options.filter(item => item !== wantedItem)
    console.log(wantedItem);
}




