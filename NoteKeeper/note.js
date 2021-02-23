// note.js
class Note {
    constructor(title, content, color = 'red', pinned = false) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.createdDate = new Date();
        this.id = '' + Date.now();
    }
}
 const n1 = new Note('tytuł', 'treść')

// notes.js
class Notes {
    constructor(containerSelector) {
        this.notesArr = [];
        this.db = new Db();
        this.notesUI = new NotesUI(containerSelector);
        if (this.db.getNotes() != undefined){
          var notes = this.db.getNotes();
          console.log(notes);
          for(const note of notes){
            this.addNote(note);
          }
       }
    }

    addNote(note) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        this.notesUI.addNote(note,this);
    }
    removeNote(id) {
        var note = this.getNote(id);
        var index = this.notesArr.indexOf(note);
        this.notesArr.splice(index,1);
        this.db.saveNotes(this.notesArr);
        console.log(this.notesArr);
        this.notesUI.removeNote(id);
    }
    getNotes() {
        return this.notesArr;
    }
    getNote(id) {
        return this.notesArr.find(el => el.id == id);
    }
}

// db.js
class Db {
    constructor() {
        this.notesLSKey = 'notes'
    }

    saveNotes(notes) {
        localStorage.setItem(this.notesLSKey, JSON.stringify(notes));
    }
    getNotes() {
        return JSON.parse(localStorage.getItem(this.notesLSKey));
    }
}

// ui.js
class NotesUI {
    constructor(containerSelector) {
        this.notesContainer = this.getNotesContainer(containerSelector);
    }
    getNotesContainer(containerSelector) {
        return document.querySelector(containerSelector);
    }
    createNote(note,obj) {
        const box = document.createElement('div');
            box.classList.add('col-4',note.id);
        const htmlNote = document.createElement('div');
            htmlNote.classList.add('note','mt-5','align-center','position-static','px-5');
            htmlNote.style.backgroundColor = note.color;
        const pinnedBox = document.createElement('div');
            pinnedBox.classList.add('row','text-right','float-right','text-white','position-static');
            if (note.pinned == true){
              pinnedBox.innerText = "Przypięty";
            }else{
              pinnedBox.innerHTML = "</br>";
            }
        const titleBox = document.createElement('div');
            titleBox.classList.add('row','h3','float-left','text-white','mt-5','position-static','w-100');
            titleBox.style.borderBottomStyle = "solid"
            titleBox.style.borderBottomColor = "rgb(110,110,110)"
            titleBox.innerText = "Temat: "+note.title;
        const contentBox = document.createElement('div');
            contentBox.classList.add('row','h4','text-left','mt-3','position-static','w-100','text-decoration-underline');
            contentBox.innerText = note.content;
        const elem = document.createElement('span');
            elem.innerHTML = "<a href = '#'>Usuń</a>";
            elem.addEventListener("click",function(){
                obj.removeNote(note.id);
            });
        box.appendChild(htmlNote);
        htmlNote.appendChild(pinnedBox);
        htmlNote.appendChild(titleBox);
        htmlNote.appendChild(contentBox);
        htmlNote.appendChild(elem);
        return box;
    }
    getNote(id) {
        var noteSelector = ('.\\3'+ id.toString()[0]+" "+id.toString().slice(1))
        console.log(noteSelector);
        return this.notesContainer.querySelector(noteSelector);
    }
    addNote(note,obj) {
        const htmlNote = this.createNote(note,obj);
        if (note.pinned == true){
            this.notesContainer.insertBefore(htmlNote,this.notesContainer.firstChild);
        }else{
            this.notesContainer.appendChild(htmlNote);
        }
    }
    removeNote(id) {
        const htmlNote = this.getNote(id);
        this.notesContainer.removeChild(htmlNote);
    }
}
