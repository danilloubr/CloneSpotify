import { IMusicaCurtida } from "./IMusicaCurtida";

export interface IPlaylist {
    id: string;
    nome: string;
    imagemUrl: string,
    musicas?: IMusicaCurtida[]
}