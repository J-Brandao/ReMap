const getFirestore = require("../Utils/getFirestore");
const getDocumentFromCollection = require("../utils/getDocFromCol")


module.exports = {
  getAllByBuilding: async (buildingId) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");
    const result = await comentarioCollectionRef.where("edificioId", "==", buildingId).get();
    const comentarios = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    
    return comentarios;
  },
  getAllByUser: async (userId) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");
    const result = await comentarioCollectionRef.where("userId","==", userId ).get();
    const comentarios = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return comentarios;
  },
  create: async (body) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");

    if(!body){
        response.status(400);
        response.end();
        return;
    }

    
    const user = body.user;
    delete body.user;

    const userCollectionRef = db.collection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    if (user.progresso.exp + 150 === 1000) {
      user.progresso.exp = 0
      user.progresso.nivel+=1
    } else if(user.progresso.exp+150 >1000){
      user.progresso.exp = 150 - (1000 - user.progresso.exp);
      user.progresso.nivel += 1;
    } else {
      user.progresso.exp += 150;
    }
    
    if (user.progresso.comentarios.nrComentarios + 1 === 15) {
      user.progresso.comentarios.badge = "badgeComentario_1.png";
      user.progresso.comentarios.nrComentarios += 1;
    } else if (user.progresso.comentarios.nrComentarios + 1 === 50) {
      user.progresso.comentarios.badge = "badgeComentario_2.png";
      user.progresso.comentarios.nrComentarios += 1;
    }else if (user.progresso.comentarios.nrComentarios + 1 === 100) {
      user.progresso.comentarios.badge = "badgeComentario_3.png";
      user.progresso.comentarios.nrComentarios += 1;
    }else {
      user.progresso.comentarios.nrComentarios += 1;
    }
    const userRef = await userDoc.update(user);
    
    
    const comentarioRef = await comentarioCollectionRef.add(body);
    return {id: comentarioRef.id, ...body}
  }
}