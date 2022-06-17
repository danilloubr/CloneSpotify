import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factory';
import { IMusicaCurtida } from 'src/app/interfaces/IMusicaCurtida';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagemUrl = ""
  bannerTexto = ""
  titulo = ""

  musicas: IMusicaCurtida[] = []
  musicaAtual: IMusicaCurtida = newMusica()
  iconePlay = faPlay

  subs: Subscription[] = []

  constructor(private activeRoute: ActivatedRoute, private spotifyService: SpotifyService, private playerService: PlayerService) { }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.obterMusicas()
    this.obterMusicaAtual()
  }

  obterMusicas() {
    const sub = this.activeRoute.paramMap.subscribe(async params => {
      const tipo = params.get('tipo')
      const id = params.get('id')

      await this.obterDadosPagina(tipo, id)
    })
    this.subs.push(sub)
  }

  async obterDadosPagina(tipo: string, id: string) {
    if (tipo === 'playlist') {
      await this.obterPlayList(id)
    } else {
      await this.obterArtista(id)
    }
  }

  async obterPlayList(playListId: string) {
    const playlistMusicas = await this.spotifyService.obterPlayList(playListId)
this.definirDados(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas)
this.titulo = `Músicas Playlist: ${playlistMusicas.nome}`
  }

  async obterArtista(artistaId: string) {

  }

  definirDados(bannerTexto: string, bannerImage: string, musicas: IMusicaCurtida[]){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  async executarMusica(musica: IMusicaCurtida) {
    await this.spotifyService.executarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)
  }

  obterArtistas(musica: IMusicaCurtida){
    return musica.artista.map(artista => artista.nome).join(", ")
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })

    this.subs.push(sub)
  }

}
