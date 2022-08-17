import axios, { Axios } from 'axios'
import { ability, pokemon } from './types/types'
import { Pokemon } from './types'

interface IPokeApiClient {
    getPokemon(id: pokemon | number): Promise<Pokemon>
    getAbility(id: ability | number): Promise<any>
}

class PokeApiClient implements IPokeApiClient {

    constructor(
        private client: Axios = axios.create(),
        private baseUrl: string = 'https://pokeapi.co/api/v2/'
    ) {
        this.client = client
        this.baseUrl = baseUrl
        this.client.interceptors.request.use(config => {
            config.baseURL = this.baseUrl
            return config
        })
    }

    async getPokemon(id: pokemon | number): Promise<Pokemon> {
        return (await this.client.get(`/pokemon/${id}`)).data
    }

    async getAbility(id: ability | number) {
        return (await this.client.get(`/ability/${id}`)).data
    }
}

export default PokeApiClient