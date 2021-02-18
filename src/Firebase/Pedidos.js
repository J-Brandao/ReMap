/*export const fetchFavPokemonList = () =>
  fetch(`http://localhost:3001/favoritos`)
    .then(response => response.json())

export const fetchFavPokemon = ( namePokemon, email ) =>
  fetch(`http://localhost:3001/favoritos/${namePokemon}/${email}`)
    .then(response => response.json())
*/

export const createEdificio = (token, nomeEdificio, descricao, localizacao, degradacao, acesso, seguranca, vandalismo) =>
  fetch(`http://localhost:3001/edificios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nomeEdificio, descricao, localizacao, degradacao, acesso, seguranca, vandalismo })
  }).then(response => console.log(response.json()));

/*export const deleteFavPokemon = (token, id) =>
  fetch(`http://localhost:3001/favoritos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });*/