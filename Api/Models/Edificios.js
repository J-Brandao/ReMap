const getFirestore = require("../Utils/getFirestore");

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
  }
}