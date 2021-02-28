const getFirestore = require("../Utils/getFirestore");

module.exports = {
  getAll: async () => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");
    const result = await comentarioCollectionRef.get();
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
    
    const comentarioRef = await comentarioCollectionRef.add(body);
    return {id: comentarioRef.id, ...body}
  }
}