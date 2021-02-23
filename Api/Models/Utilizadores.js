const getCollection = require("../utils/getCollection")
const getDocumentFromCollection = require("../utils/getDocFromCol")

module.exports = {

  get: async (userId) => {
    if (!userId) {
      console.warn("ups")
      throw new Error("É necessário um id de utilizador")
    }

    const coll = getCollection("Utilizadores");
    const doc = await coll.where("userId", "==", userId).get();

    if (doc.empty) {
      return false;
    }

    
    return {id:doc.docs[0].id, ...doc.docs[0].data()}
  },
  getAll: async () => {
    const utilizadorCollectionRef = getCollection("Utilizadores")
    const result = await utilizadorCollectionRef.get();
    const utilizadores = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return utilizadores;
  },
  create: async (body) => {
    const edificioCollectionRef = getCollection("Utilizadores")

    if(!body){
        throw new Error("É necessário um body")
    }

    const edificioRef = await edificioCollectionRef.add(body);
    return {id: edificioRef.id, ...body}
  }
}