import { IArtirta } from "../interfaces/IArtista";
import { IMusicaCurtida } from "../interfaces/IMusicaCurtida";

export function newArtista(): IArtirta {
    return {
        id: "",
        imagemUrl: "",
        musicas: "",
        nome: ""
    }
}

export function newMusica(): IMusicaCurtida {
    return {
        id: "",
        album: {
            id: "",
            imagemUrl: "",
            nome: "",
        },
        artista: [],
        tempo: "",
        titulo: ""
    }
}