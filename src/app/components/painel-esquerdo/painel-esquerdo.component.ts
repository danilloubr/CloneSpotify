import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  iconeHome = faHome
  iconePesquisar = faSearch
  iconeArtirtas = faGuitar
  iconePlaylist = faMusic

  menuSelecionado = 'Home'

  playList: IPlaylist[] = []

  constructor( 
    private spotifyService: SpotifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buscarPlayList()
  }

  async buscarPlayList(){
    this.playList =  await this.spotifyService.buscarPlayListUsuario()
  }

  botaoClique(event: string) {
    this.menuSelecionado = event
    if (event === "Home") {
      this.router.navigateByUrl("player/home")
    } else if (event === "Pesquisar") {
      this.router.navigateByUrl("player/pesquisar")
    } else if (event === "Artistas") {
      this.router.navigateByUrl("player/artistas")
    }
  }

  irParaPlaylist(playListId: string){
    this.menuSelecionado = playListId
    this.router.navigateByUrl(`player/lista/playlist/${playListId}`)
  }

}
