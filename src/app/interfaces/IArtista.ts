import { IMusicaCurtida } from "./IMusicaCurtida";

export interface IArtirta {
    id: string;
    nome: string;
    imagemUrl: string;
    musicas?: IMusicaCurtida[]
}