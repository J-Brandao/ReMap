const getCollection = require("../Utils/getCollection")
const getDocumentFromCollection = require("../Utils/getDocFromCol")

const COLLECTION_NAME = "Relacao_User_User"

module.export = {
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
    const coll = getCollection(COLLECTION_NAME);
    const result = await coll.where("userId","==",userId).get();
    const friends = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return friends;
  },
  create: async (body) => {
    const coll = getCollection(COLLECTION_NAME);
    const docRef = await coll.add(body);
    return { id: docRef.id, ...body };
  },
  remove: async (id) => {
    if (!id) {
      throw new Error("An id must be provided")
    }
    const coll = getCollection(COLLECTION_NAME)
    const doc = getDocumentFromCollection(coll, id);
    await doc.delete();
    return true;
  }

}