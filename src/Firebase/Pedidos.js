//EDIFICIOS
export const fetchEdificioList = () =>
  fetch(`http://localhost:3001/edificios`)
    .then(response => response.json())

/*export const fetchFavPokemon = ( namePokemon, email ) =>
  fetch(`http://localhost:3001/favoritos/${namePokemon}/${email}`)
    .then(response => response.json())
*/

export const createEdificio = (token, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo) =>
  fetch(`http://localhost:3001/edificios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo })
  }).then(response => console.log(response.json()));

/*export const deleteFavPokemon = (token, id) =>
  fetch(`http://localhost:3001/favoritos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });*/


//UTILIZADORES
export const createUtilizador = (token, imagemUser, nomeUtilizador, biografia, pais, cidade) =>
fetch(`http://localhost:3001/utilizadores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ imagemUser, nomeUtilizador, biografia, pais, cidade })
}).then(response => console.log(response.json()));