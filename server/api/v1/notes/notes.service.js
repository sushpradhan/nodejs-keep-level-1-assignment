const noteDAO = require('./notes.dao');


const addNotes = (userId,data) => {
    //console.log('add notes 3');
    return noteDAO.addNotes(userId,data);
}


const getNotesByUserId = (userId) => {
    return noteDAO.getNotesByUserId(userId);
}


const updateNotes = (noteId,note) => {
    //console.log('update notes 3');
    return noteDAO.updateNotes(noteId,note);
}

module.exports = {
    addNotes,
    getNotesByUserId,
    updateNotes
}
