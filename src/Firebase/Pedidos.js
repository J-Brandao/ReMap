//EDIFICIOS
export const fetchEdificioList = () =>
  fetch(`http://localhost:3001/edificios`)
    .then(response => response.json())

export const fetchEdificio = ( id ) =>
  fetch(`http://localhost:3001/edificio/${id}`)
    .then(response => response.json())


export const createEdificio = (token, userId, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo) =>
  fetch(`http://localhost:3001/edificios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo })
  }).then(response => console.log(response.json()));

/*export const deleteFavPokemon = (token, id) =>
  fetch(`http://localhost:3001/favoritos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });*/


//UTILIZADORES

export const fetchUtilizadoresList = () =>
  fetch(`http://localhost:3001/utilizadores`)
    .then(response => response.json())

export const fetchUtilizadorById = (userId) =>
  fetch(`http://localhost:3001/utilizador/${userId}`)
    .then(response => response.json())

export const fetchUtilizadorForPerfil = (userId) =>
  fetch(`http://localhost:3001/utilizadorPerfil/${userId}`)
    .then(response => response.json())
    
export const updateUtilizador = (token, docID, userID, imagemUser, nomeUtilizador, biografia, pais, cidade) =>
  fetch(`http://localhost:3001/utilizadorPerfil/${docID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userID, imagemUser, nomeUtilizador, biografia, pais, cidade })
  }).then(response => console.log(response.json()));
  
export const createUtilizador = (token, userID, imagemUser, nomeUtilizador, biografia, pais, cidade) =>
fetch(`http://localhost:3001/utilizadores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userID, imagemUser, nomeUtilizador, biografia, pais, cidade })
}).then(response => console.log(response.json()));

//AMIGOS

export const fetchAllFriends = (userId) => {
  return fetch(`http://localhost:3001/friends/${userId}`)
    .then(response => response.json())
}

export const fetchFriends = (userId, friendId) => {
  return fetch(`http://localhost:3001/friend/${userId}/${friendId}`)
    .then(response => response.json())
}

export const createFriends = (token, nomeFriend, userId, friendId, imagemUser) => {
  return fetch(`http://localhost:3001/friends`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nomeFriend, userId, friendId, imagemUser })
  }).then(response => response.json());
}

export const deleteFriends = (token, id) => {
  return fetch(`http://localhost:3001/friend/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//COMENTÁRIOS

export const fetchComentariosListByBuilding = (buildingId) =>
  fetch(`http://localhost:3001/comentarios/building/${buildingId}`)
    .then(response => response.json())

    export const fetchComentariosListByUser = (userId) =>
  fetch(`http://localhost:3001/comentarios/user/${userId}`)
    .then(response => response.json())
    
export const createComentario = (token, userId, valor, edificioId) =>
fetch(`http://localhost:3001/comentarios`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userId, valor, edificioId })
}).then(response => console.log(response.json()));

//SUGESTÕES

export const fetchSugestoesListByBuilding = (buildingId) =>
  fetch(`http://localhost:3001/sugestoes/building/${buildingId}`)
    .then(response => response.json())

    export const fetchSugestoesListByUser = (userId) =>
  fetch(`http://localhost:3001/sugestoes/user/${userId}`)
    .then(response => response.json())

export const createSugestao = (token, userId, valor, edificioId) =>
fetch(`http://localhost:3001/sugestoes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userId, valor, edificioId })
}).then(response => console.log(response.json()));