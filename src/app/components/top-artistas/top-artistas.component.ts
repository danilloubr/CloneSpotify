import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factory';
import { IArtirta } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {
  topArtista: IArtirta = newArtista()

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtistas()
  }

  async buscarTopArtistas(){
   const artistas = await this.spotifyService.buscarTopArtistas(1)
   if(!!artistas){
     this.topArtista = artistas.pop()
   }

  }

}
