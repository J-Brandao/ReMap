const getCollection = require("../utils/getCollection")

module.exports = {
  getAll: async () => {
    const equipaCollectionRef = getCollection("Equipas")
    const result = await equipaCollectionRef.orderBy("points", "desc").get();
    const equipas = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return equipas;
  }
}