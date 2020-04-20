const uuidv1 = require('uuidv1');

module.exports = function(request){
      return newNote = {
         "title": request.title,
         "text": request.text,
         "id": uuidv1()
   }
}