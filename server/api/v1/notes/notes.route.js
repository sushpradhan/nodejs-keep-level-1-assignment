const router = require('express').Router();
const notesCtrl = require('./notes.controller');


router.post('/',(req,res) => { 
   let userId = req.query.userId;

   notesCtrl.addNotes(userId,req.body).then((response) => {
    res.status(response.status).send(response.note);
    }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});



router.get('/',(req,res) => {  
    
    let userId = req.query.userId;
    notesCtrl.getNotesByUserId(userId).then((response) => {
        res.status(response.status).send(response.notes);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});


router.put('/:noteId',(req,res) => {  
    //.log('update notes 1');
    let noteId = req.params.noteId;

    notesCtrl.updateNotes(noteId,req.body).then((response) => {
        res.status(response.status).send(response.note);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

module.exports = router;
