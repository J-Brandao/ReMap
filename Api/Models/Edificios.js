const getFirestore = require("../Utils/getFirestore");
const getCollection = require("../utils/getCollection")
const getDocumentFromCollection = require("../utils/getDocFromCol")

module.exports = {
  get: async (id) =>  {
    if (!id) {
        throw new Error("Oops! An error occured!");
    }

    const db = getFirestore();
    const edificioCollectionRef = db.collection("Edifícios");

    const doc = await edificioCollectionRef.doc(`${id}`).get();

    if(doc.empty){
      return false;
    }
    
    return {id: doc.id, ...doc.data()};
  },
  getForPerfil: async (id) =>  {
    if (!id) {
        throw new Error("Oops! An error occured!");
    }

    const db = getFirestore();
    const edificioCollectionRef = db.collection("Edifícios");

    const doc = await edificioCollectionRef.where('userId', '==', id).get();

    const edificios = doc.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    
    return edificios;
  },
  getAll: async () => {
    const db = getFirestore();
    const pokeCollectionRef = db.collection("Edifícios");
    const result = await pokeCollectionRef.get();
    const edificios = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return edificios;
  },
  create: async (body) => {
    const db = getFirestore();
    const edificioCollectionRef = db.collection("Edifícios");

    

    if(!body){
        response.status(400);
        response.end();
        return;
    }

    const user = body.user;
    delete body.user;

    const userCollectionRef = db.collection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    if (user.progresso.exp + 500 === 1000) {
      user.progresso.exp = 0
      user.progresso.nivel+=1
    } else if(user.progresso.exp+500 >1000){
      user.progresso.exp = 500 - (1000 - user.progresso.exp);
      user.progresso.nivel += 1;
    } else {
      user.progresso.exp += 500;
    }
    
    if (user.progresso.edificios.nrEdificios + 1 === 15) {
      user.progresso.edificios.badge = "badgeEdificio_1.svg";
      user.progresso.edificios.nrEdificios += 1;
    } else {
      user.progresso.edificios.nrEdificios += 1;
    }
    const userRef = await userDoc.update(user);
    const edificioRef = await edificioCollectionRef.add(body);
    return {id: edificioRef.id, ...body}
    

  },
  remove: async (id) => {
    const db = getFirestore();
    const edificioCollectionRef = db.collection("Edifícios");
    
    if(!id){
        response.status(400);
        response.end();
        return;
    }

    const edificioRef = edificioCollectionRef.doc(id);
    await edificioRef.delete();
  },
  update: async (id, body) => {
    if (!id) {
      throw new Error("An ID must be provided");
    }

    if (!body) {
      throw new Error("A body must be provided");
    }

  

    const coll = getCollection("Edifícios");
    const doc = getDocumentFromCollection(coll, id);

    await doc.update(body);
    return true;
  },
}