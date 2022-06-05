import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusicaCurtida } from 'src/app/interfaces/IMusicaCurtida';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicas: IMusicaCurtida[] = []
  iconPlayer = faPlay

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarMusicasCurtidas()
  }

  async buscarMusicasCurtidas(){
    this.musicas =  await this.spotifyService.buscarMusicasCurtidas()
    console.log("MUSICAS", this.musicas)
  }

  obterArtista(musica: IMusicaCurtida){
    return musica.artista.map(artista => artista.nome).join(", ")
  }

  async executarMusica(musica: IMusicaCurtida) {
    await this.spotifyService.executarMusica(musica.id)
  }

}
