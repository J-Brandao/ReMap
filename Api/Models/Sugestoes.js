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
    const edificio = body.edificio;
    delete body.edificio;

    const userCollectionRef = db.collection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    const edificioCollectionRef = db.collection("Edifícios");
    const edificioDoc = getDocumentFromCollection(edificioCollectionRef, edificio.id);

    
    const teamCollectionRef = db.collection("Equipas");
    const teamId = await teamCollectionRef.where("teamName", "==", user.equipa).get();

    const teamObj = teamId.docs[0].data()
    const userTeam = teamId.docs[0].id

      teamObj.points += 200;
      teamObj.estatisticas.nrSugestoes += 1;

    const teamDoc = getDocumentFromCollection(teamCollectionRef, userTeam)

    edificio.domain[user.equipa] += 150;
    edificio.domain.total += 150;

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
      user.progresso.sugestao.badge = "badgeSugestao_1.svg";
      user.progresso.sugestao.nrSugestoes += 1;
    }else if (user.progresso.comentarios.nrComentarios + 1 === 50) {
      user.progresso.comentarios.badge = "badgeSugestao_2.svg";
      user.progresso.comentarios.nrComentarios += 1;
    }else if (user.progresso.comentarios.nrComentarios + 1 === 100) {
      user.progresso.comentarios.badge = "badgeSugestao_3.svg";
      user.progresso.comentarios.nrComentarios += 1;
    } else {
      user.progresso.sugestao.nrSugestoes += 1;
    }

    const teamRef = await teamDoc.update(teamObj);
    const userRef = await userDoc.update(user);
    const edificioRef = await edificioDoc.update(edificio);
    
    const sugestaoRef = await sugestaoCollectionRef.add(body);
    return {id: sugestaoRef.id, ...body}
  }
}