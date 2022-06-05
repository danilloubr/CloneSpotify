import { addMilliseconds, format } from "date-fns";
import { IArtirta } from "../interfaces/IArtista";
import { IMusicaCurtida } from "../interfaces/IMusicaCurtida";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuarios";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {

    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}

export function SpotifyPlayListParaPlayList(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop()?.url
    }
}

export function SpotifyArtistaParaArtista(artista: SpotifyApi.ArtistObjectFull): IArtirta {
    return {
        id: artista.id,
        imagemUrl: artista.images.sort((a, b) => a.width - b.width).pop().url,
        nome: artista.name
    }
}

export function SpotifyMusicasParaMusica(musica: SpotifyApi.TrackObjectFull): IMusicaCurtida {
    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms)
        return format(data, "mm:ss")
    }
    return {
        id: musica.uri,
        titulo: musica.name,
        album: {
            id: musica.id,
            imagemUrl: musica.album.images.shift().url,
            nome: musica.album.name
        },
        artista: musica.artists.map((artista => {
            return {
                id: artista.id,
                nome: artista.name
            }
        })),
        tempo: msParaMinutos(musica.duration_ms)
    }
}