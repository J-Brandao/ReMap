//EDIFICIOS
export const fetchEdificioList = () =>
  fetch(`http://localhost:3001/edificios`)
    .then(response => response.json())

export const fetchEdificio = ( coordenadas ) =>
  fetch(`http://localhost:3001/edificio/${coordenadas}`)
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
    
  
export const createUtilizador = (token, userID, imagemUser, nomeUtilizador, biografia, pais, cidade) =>
fetch(`http://localhost:3001/utilizadores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userID, imagemUser, nomeUtilizador, biografia, pais, cidade })
}).then(response => console.log(response.json()));