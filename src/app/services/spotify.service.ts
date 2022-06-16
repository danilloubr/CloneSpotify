import { Injectable } from '@angular/core';
import { SpotifyConfifuration } from 'src/environments/environment';
import Spotify from "spotify-web-api-js"
import { IUsuario } from '../interfaces/IUsuarios';
import { SpotifyArtistaParaArtista, SpotifyMusicasParaMusica, SpotifyPlayListParaPlayList, SpotifyUserParaUsuario } from '../common/spotifyHelper';
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
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit})
    console.log("play;ist no servece", playlists)
    return playlists.items.map(item => SpotifyPlayListParaPlayList(item))
    
  }

  async buscarTopArtistas(limit = 10): Promise<IArtirta[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit })
    console.log("artista:", artistas)
    return artistas.items.map(SpotifyArtistaParaArtista)
  }


  async buscarMusicasCurtidas(offset = 0, limit = 50): Promise<IMusicaCurtida[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit })
    return musicas.items.map(x => SpotifyMusicasParaMusica(x.track))
  }

  async executarMusica(musicaID: string){
    await this.spotifyApi.queue(musicaID)
    await this.spotifyApi.skipToNext()
  }

  async obterMusicaAtual(): Promise<IMusicaCurtida>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicasParaMusica(musicaSpotify.item)
  }


  sair(){
    localStorage.clear()
    this.router.navigate(["/login"])
  }


}
