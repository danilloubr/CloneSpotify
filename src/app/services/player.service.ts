import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../common/factory';
import { IMusicaCurtida } from '../interfaces/IMusicaCurtida';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusicaCurtida>(newMusica())
  timerId: any = null

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual()
  }


  async obterMusicaAtual(){
    clearTimeout(this.timerId);

    // Obtenho a musica
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);

    // Causo loop
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 2000)
  }


  async definirMusicaAtual(musica: IMusicaCurtida) {
    this.musicaAtual.next(musica)
  }

  async voltarMusica(){
    await this.spotifyService.voltarMusica()
  }

  async proximaMusica(){
    await this.spotifyService.proximaMusixca()
  }
  
  async playMusica(){
    await this.spotifyService.playMusica()
  }
  async pauseMusica(){
    await this.spotifyService.pauseMusica()
  }

}
