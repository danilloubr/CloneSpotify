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

  async obterMusicaAtual() {
    // clearTimeout(this.timerId)
    const musica = await this.spotifyService.obterMusicaAtual()
    // this.timerId = setInterval(() => {
     this.definirMusicaAtual(musica)
    // }, 3000)
  }


  async definirMusicaAtual(musica: IMusicaCurtida) {
    this.musicaAtual.next(musica)
  }
}
