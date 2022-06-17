import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factory';
import { IMusicaCurtida } from 'src/app/interfaces/IMusicaCurtida';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: IMusicaCurtida[] = []
  musicaAtual: IMusicaCurtida = newMusica()
  iconPlayer = faPlay

  subs: Subscription[] = []

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }
  
  ngOnInit(): void {
    this.buscarMusicasCurtidas()
    this.obterMusicaAtual()
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(subs => {
      subs.unsubscribe()
    })
  }

  async buscarMusicasCurtidas(){
    this.musicas =  await this.spotifyService.buscarMusicasCurtidas()
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })

    this.subs.push(sub)
  }

  obterArtista(musica: IMusicaCurtida){
    return musica.artista.map(artista => artista.nome).join(", ")
  }

  async executarMusica(musica: IMusicaCurtida) {
    await this.spotifyService.executarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)
  }

}
