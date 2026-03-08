import { Cache } from "./pokecache.js";

export type ShallowLocation = {
    name: string; 
    url: string; 
};

export type ShallowLocations = {
    count: number; 
    next: string | null; 
    previous: string | null;
    results: ShallowLocation[];
}; 

export type PokemonEncounter = {
    pokemon: {
        name: string;
        url: string;
    };
};

export type Location = {
    id: number;
    name: string;
    pokemon_encounters: PokemonEncounter[];
};

type PokemonStat = {
    base_stat: number;
    stat: {
      name: string;  
    };
};

type PokemonType = {
    type: {
        name: string;
    };
};

export type Pokemon = {
    name: string; 
    base_experience: number;
    height: number;
    weight: number; 
    stats: PokemonStat[];
    types: PokemonType[];
};

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache = new Cache (300_000); // 5 mins
    
    constructor(){}

    async fetchLocations(pageURL?:string):Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached){
            return cached;
        } 
        // Cache Miss
        const response = await fetch(url);
        if (!response.ok)
            throw new Error (`Failed to fetch locations: ${response.statusText}`);
        
        const data = await response.json() as ShallowLocations;
        this.cache.add(url, data);
        return data;
    }

    async fetchLocation (locationName: string) : Promise<Location>{
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
        if (cached)
            return cached;

        const response = await fetch (url);
        if (!response.ok)
            throw new Error (`Faild to fetch location: ${response.statusText}`);

        const data = await response.json() as Location; 
        this.cache.add(url, data);
        return data; 
    }

    async fetchPokemon (pokemonName: string) : Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get<Pokemon>(url);
        if (cached)
            return cached;
        const response = await fetch(url);
        if (!response.ok)
            throw new Error (`Pokemon not found: ${pokemonName}`);
        const data = await response.json() as Pokemon;
        this.cache.add(url, data);
        return data;
    }
    
}