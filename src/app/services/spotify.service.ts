import { Injectable } from '@angular/core';
import { SpotifyConfifuration } from 'src/environments/environment';
import Spotify from "spotify-web-api-js"
import { IUsuario } from '../interfaces/IUsuarios';
import { SpotifyArtistaParaArtista, SpotifyMusicasParaMusica, SpotifyPlayListParaPlayList, SpotifySinglkePlaylistParaPlaylist, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtirta } from '../interfaces/IArtista';
import { IMusicaCurtida } from '../interfaces/IMusicaCurtida';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null
  usuario: IUsuario

  constructor(private router: Router) {
    this.spotifyApi = new Spotify()
  }

  async inicializarUsuario() {
    if (!!this.usuario)
      return true

    const token = localStorage.getItem("token")
    if (!token)
      return false

    try {
      this.definirAcessoToken(token)
      await this.obterSpotifyUser()
      return !!this.usuario

    } catch (error) {
      console.error(error)
      return false
    }
  }

  async obterSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe()
    this.usuario = SpotifyUserParaUsuario(userInfo)
  }

  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfifuration.authEndPoint}?`
    const clientId = `client_id=${SpotifyConfifuration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfifuration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfifuration.scopes.join("%20")}&`
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType
  }

  obterToeknUrlCallback() {
    if (!window.location.hash)
      return ""

    const params = window.location.hash.substring(1).split("&");
    return params[0].split("=")[1]
  }

  definirAcessoToken(token: string) {
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem("token", token)
  }

  async buscarPlayListUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit })
    return playlists.items.map(item => SpotifyPlayListParaPlayList(item))

  }

  async buscarTopArtistas(limit = 10): Promise<IArtirta[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit })
    return artistas.items.map(SpotifyArtistaParaArtista)
  }


  async buscarMusicasCurtidas(offset = 0, limit = 50): Promise<IMusicaCurtida[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit })
    return musicas.items.map(x => SpotifyMusicasParaMusica(x.track))
  }

  async executarMusica(musicaID: string) {
    await this.spotifyApi.queue(musicaID)
    await this.spotifyApi.skipToNext()
  }

  async obterMusicaAtual(): Promise<IMusicaCurtida> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicasParaMusica(musicaSpotify.item)
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious()
  }

  async proximaMusixca() {
    await this.spotifyApi.skipToNext()
  }

  async playMusica() {
    await this.spotifyApi.play()
  }

  async pauseMusica() {
    await this.spotifyApi.pause()
  }


  async pesquisar(pesquisa: string, tipo: any[] ) {
   const result =  await this.spotifyApi.search(pesquisa, tipo)
   return result.artists
    }

  async obterPlayList(playListId: string, offset = 0, limit = 50) {
    const playListSpotify = await this.spotifyApi.getPlaylist(playListId)
    if (!playListSpotify) {
      return null
    }
    const playlist = SpotifySinglkePlaylistParaPlaylist(playListSpotify)
    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playListId, { offset, limit })

    playlist.musicas = musicasSpotify.items.map(musica => SpotifyMusicasParaMusica(musica.track as SpotifyApi.TrackObjectFull))
    return playlist
  }




  sair() {
    localStorage.clear()
    this.router.navigate(["/login"])
  }


}
