const getFirestore = require("../Utils/getFirestore");

module.exports = {
  get: async (id) =>  {
    if (!id) {
        throw new Error("Oops! An error occured!");
    }

    const db = getFirestore();
    const utilizadorCollectionRef = db.collection("Utilizadores");

    const doc = await utilizadorCollectionRef.where("userID", "==", id).get();

    if(doc.empty){
      return false;
    }
    
    return {id: doc.docs[0].id, ...doc.docs[0].data()};
  },
  getAll: async () => {
    const db = getFirestore();
    const utilizadorCollectionRef = db.collection("Utilizadores");
    const result = await utilizadorCollectionRef.get();
    const utilizadores = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return utilizadores;
  },
  create: async (body) => {
    const db = getFirestore();
    const edificioCollectionRef = db.collection("Utilizadores");

    if(!body){
        response.status(400);
        response.end();
        return;
    }

    const edificioRef = await edificioCollectionRef.add(body);
    return {id: edificioRef.id, ...body}
  }
}