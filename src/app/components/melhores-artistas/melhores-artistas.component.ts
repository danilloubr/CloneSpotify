import { Component, OnInit } from '@angular/core';
import { IArtirta } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-melhores-artistas',
  templateUrl: './melhores-artistas.component.html',
  styleUrls: ['./melhores-artistas.component.scss']
})
export class MelhoresArtistasComponent implements OnInit {

  artistas: IArtirta[] = []

  constructor(private spotigyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtista()
  }

  async buscarTopArtista() {
    this.artistas = await this.spotigyService.buscarTopArtistas(5)
    console.log("artirtas:", this.artistas)
  }

}
