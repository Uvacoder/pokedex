export interface Pokemon {
  id: number,
  name: string,
  order: number,
  picture: string
}

export interface PokemonDetail {
  abilities: Array<string>,
  evolution: Array<object>,
  id: number,
  moves: Array<string>,
  name: string,
  order: number,
  picture: string
  species: string,
  stats: Array<object>,
  type: Array<string>
}