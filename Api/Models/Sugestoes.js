const getFirestore = require("../Utils/getFirestore");

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
    
    const sugestaoRef = await sugestaoCollectionRef.add(body);
    return {id: sugestaoRef.id, ...body}
  }
}