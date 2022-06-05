import { IArtirta } from "../interfaces/IArtista";

export function newArtista(): IArtirta {
    return {
        id: "",
        imagemUrl: "",
        musicas: "",
        nome: ""
    }
}