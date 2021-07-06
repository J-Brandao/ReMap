const getFirestore = require("../Utils/getFirestore");
const getDocumentFromCollection = require("../utils/getDocFromCol")


module.exports = {
  getAllByBuilding: async (buildingId) => {
    const db = getFirestore();
    const sugestaoCollectionRef = db.collection("Sugestao");
    const result = await sugestaoCollectionRef.where("edificioId", "==", buildingId).get();
   
    const sugestoes = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    
    return sugestoes;
  },
  getAllByUser: async (userId) => {
    const db = getFirestore();
    const sugestaoCollectionRef = db.collection("Sugestao");
    const result = await sugestaoCollectionRef.where("userId","==", userId ).get();
    const sugestoes = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return sugestoes;
  },
  create: async (body) => {
    const db = getFirestore();
    const sugestaoCollectionRef = db.collection("Sugestao");

    if(!body){
        response.status(400);
        response.end();
        return;
    }

    const user = body.user;
    delete body.user;

    const userCollectionRef = db.collection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    if (user.progresso.exp + 250 === 1000) {
      user.progresso.exp = 0
      user.progresso.nivel+=1
    } else if(user.progresso.exp+250 >1000){
      user.progresso.exp = 250 - (1000 - user.progresso.exp);
      user.progresso.nivel += 1;
    } else {
      user.progresso.exp += 250;
    }
    
    if (user.progresso.sugestao.nrSugestoes + 1 === 15) {
      user.progresso.sugestao.badge = "badgeEdificio_1.svg";
      user.progresso.sugestao.nrSugestoes += 1;
    } else {
      user.progresso.sugestao.nrSugestoes += 1;
    }
    const userRef = await userDoc.update(user);
    
    const sugestaoRef = await sugestaoCollectionRef.add(body);
    return {id: sugestaoRef.id, ...body}
  }
}