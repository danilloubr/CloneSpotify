import { IUsuario } from "../interfaces/IUsuarios";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {

    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}