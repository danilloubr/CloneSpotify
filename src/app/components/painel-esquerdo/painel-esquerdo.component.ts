import { Component, OnInit } from '@angular/core';
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

  constructor( private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarPlayList()
  }

  async buscarPlayList(){
    this.playList =  await this.spotifyService.buscarPlayListUsuario()
    console.log("lista:", this.playList)
  }

  botaoClique(event: string){
this.menuSelecionado = event
  }

}
