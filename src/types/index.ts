export interface Pokemon {
  id: number,
  name: string,
  order: number,
  picture: string // obj.sprites.front_default -- returns a PNG
}

export interface PokemonDetail {
  abilities: Array<object>,
  evolution: Array<object>,
  id: number,
  moves: Array<object>,
  name: string,
  order: number,
  picture: string // obj.sprites.other.official-artwork.front_default -- returns a PNG
  species: string,
  stats: Array<object>,
}