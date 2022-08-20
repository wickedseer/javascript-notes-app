console.log("this is notes");
showNotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    let dt = day + "/" + month + "/" + year + " " + h + ":" + m;

    notesObj.push({ title: addtitle.value, note: addtxt.value, date: dt });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesObj);

    showNotes();
})

// function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        let titleStr = element.title;
        if (titleStr == '')
            titleStr = "Note " + (index + 1);

        notetitle = titleStr.charAt(0).toUpperCase() + titleStr.slice(1);

        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title"> ${notetitle}</h5>
                    <p class="card-text"> ${element.note} </p>
                    <p style="color:grey" id="date-time"> ${element.date} </p>
                    <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show here!`
    }
}

// function to delete a node
function deleteNode(index) {
    //console.log(`deleting node`, index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})