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