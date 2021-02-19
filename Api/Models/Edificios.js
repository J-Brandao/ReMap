const getFirestore = require("../Utils/getFirestore");

module.exports = {
  /*get: async (id, email) =>  {
    if (!id && !email) {
        throw new Error("Oops! An error occured!");
    }

    const db = getFirestore();
    const pokeCollectionRef = db.collection("Favoritos");

    const doc = await pokeCollectionRef.where("namePokemon", "==", id).where("email", "==", email).get();

    if(doc.empty){
      return false;
    }
    
    return {id: doc.docs[0].id};
  },*/
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
  }/*,
  remove: async (id) => {
    const db = getFirestore();
    const pokeCollectionRef = db.collection("Favoritos");
    
    if(!id){
        response.status(400);
        response.end();
        return;
    }

    const pokeRef = pokeCollectionRef.doc(id);
    await pokeRef.delete();
  }*/
}