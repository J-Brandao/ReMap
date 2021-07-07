const getCollection = require("../Utils/getCollection")
const getDocumentFromCollection = require("../Utils/getDocFromCol")

const COLLECTION_NAME = "Relacao_User_User"

module.exports = {
  get: async (userId, friendId) => {
    
    if (!userId) {
      throw new Error("É necessário enviar um Id para o utilizador")
    }
    if (!friendId) {
      throw new Error("É necessário enviar um Id para o amigo")
    }
    const coll = getCollection(COLLECTION_NAME);

    const doc = await coll.where("userId", "==", userId).where("friendId", "==", friendId).get();

    if (doc.empty)
      return false;
    
    return {id: doc.docs[0].id}
  },
  getAll: async (userId) => {
    const friendCollectionRef = getCollection(COLLECTION_NAME)
    
    const result = await friendCollectionRef.where("userId","==",userId).get();
   
    const friends = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return friends;
  },
  create: async (body) => {
    
    const coll = getCollection(COLLECTION_NAME);

    const user = body.ownUser;
    delete body.ownUser;
    
    const userCollectionRef = getCollection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    if (user.progresso.exp + 100 === 1000) {
      user.progresso.exp = 0
      user.progresso.nivel+=1
    } else if(user.progresso.exp+100 >1000){
      user.progresso.exp = 100 - (1000 - user.progresso.exp);
      user.progresso.nivel += 1;
    } else {
      user.progresso.exp += 100;
    }
    
    if (user.progresso.amigos.nrAmigos + 1 === 25) {
      user.progresso.amigos.badge = "badgeAmigo_1.png";
      user.progresso.amigos.nrAmigos += 1;
    }else if (user.progresso.comentarios.nrAmigos + 1 === 75) {
      user.progresso.comentarios.badge = "badgeAmigo_2.png";
      user.progresso.comentarios.nrAmigos += 1;
    }else if (user.progresso.comentarios.nrAmigos + 1 === 150) {
      user.progresso.comentarios.badge = "badgeAmigo_3.png";
      user.progresso.comentarios.nrAmigos += 1;
    } else {
      user.progresso.amigos.nrAmigos += 1;
    }
    const userRef = await userDoc.update(user);

    const docRef = await coll.add(body);
    return { id: docRef.id, ...body };
  },
  remove: async (id, body) => {

    
    if (!id) {
      throw new Error("An id must be provided")
    }
    const coll = getCollection(COLLECTION_NAME)
    const doc = getDocumentFromCollection(coll, id);

    const user = body.ownUser;
    delete body.ownUser;

    const userCollectionRef = getCollection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    if (user.progresso.exp - 100 === 0) {
      user.progresso.exp -= 0
    } else if(user.progresso.exp-100 <0){
      user.progresso.exp = 1000 - (user.progresso.exp - 100);
      user.progresso.nivel -= 1;
    } else {
      user.progresso.exp -= 100;
    }
    
    if (user.progresso.amigos.nrAmigos - 1 < 25) {
      user.progresso.amigos.badge = "badgeAmigo_0.png";
      user.progresso.amigos.nrAmigos -= 1;
    }else if (user.progresso.comentarios.nrAmigos - 1 < 75) {
      user.progresso.comentarios.badge = "badgeAmigo_1.png";
      user.progresso.comentarios.nrAmigos -= 1;
    }else if (user.progresso.comentarios.nrAmigos - 1 < 150) {
      user.progresso.comentarios.badge = "badgeAmigo_2.png";
      user.progresso.comentarios.nrAmigos -= 1;
    } else {
      user.progresso.amigos.nrAmigos -= 1;
    }
    const userRef = await userDoc.update(user);


    await doc.delete();
    return true;
  }

}