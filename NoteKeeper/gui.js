window.setInterval(function(){
  var e = document.getElementById("selectColor")
  e.style.backgroundColor = e.options[e.selectedIndex].value;

},100);

const NotesArr = new Notes("#Notes");
console.log(NotesArr);
function submitForm(){
  
  form = document.querySelector("#form");
  title = document.querySelector("#titleInput").value;
  content = document.querySelector("#contentArea").value;
  if (title.length == 0 || content.length == 0){
  }else{
    
    color = document.querySelector("#selectColor").value;
    pinned = document.querySelector("#pinned").checked;
    note = new Note(title,content,color,pinned);
    form.reset();
    document.getElementById('newNoteId').style.visibility = 'hidden';
    NotesArr.addNote(note);

  }
}
