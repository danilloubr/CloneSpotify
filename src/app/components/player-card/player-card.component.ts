import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay, faStepBackward, faStepForward, faStop } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factory';
import { IMusicaCurtida } from 'src/app/interfaces/IMusicaCurtida';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musicaAtual: IMusicaCurtida = newMusica()
  subs: Subscription[] = []

  iconeVoltar = faStepBackward
  iconeProxima = faStepForward
  iconePlay = faPlay
  iconeStop = faStop

  tocando: boolean = true

  constructor(private playerService: PlayerService) { }


  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.obterMusicaAtual()
    if (this.musicaAtual) {
      this.tocando = false
    }
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })

    this.subs.push(sub)
  }

  voltarMusica() {
    this.playerService.voltarMusica()
  }

  proximaMusica() {
    this.playerService.proximaMusica()
  }

  playMusica() {
    this.tocando = false
    this.playerService.playMusica()
  }

  pauseMusica() {
    this.tocando = true
    this.playerService.pauseMusica()
  }

}
