export interface Pokemon {
  id: number,
  name: string,
  order: number,
  picture: string // obj.sprites.front_default -- returns a PNG
}

export interface PokemonDetail {
  abilities: Array<string>,
  evolution: Array<string>,
  id: number,
  moves: Array<string>,
  name: string,
  order: number,
  picture: string // obj.sprites.other.official-artwork.front_default -- returns a PNG
  species: string,
  stats: Array<object>,
  type: Array<string>
}