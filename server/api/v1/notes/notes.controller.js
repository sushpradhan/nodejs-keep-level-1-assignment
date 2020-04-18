const notesService = require('./notes.service');


const addNotes = (userId,data) => {
    // console.log('add notes 2');
    return notesService.addNotes(userId,data);
}


const getNotesByUserId = (userId) => {
    return notesService.getNotesByUserId(userId);
}


const updateNotes = (noteId,note) => {
    //console.log('update notes 2');
    return notesService.updateNotes(noteId,note);
}

module.exports = {
    addNotes,
    getNotesByUserId,
    updateNotes
}
