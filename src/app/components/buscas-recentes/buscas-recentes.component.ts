import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  pesquisasRecentes = [
    "Top Brasil", "Top Global"
  ]

  campoPesquisa = ""

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa

  }

  buscar(){
    const teste = this.spotifyService.pesquisar(this.campoPesquisa, ["artist"]).then((result) => {
console.log("resultado:", result)
    })
    console.log("teste aqui", teste)
  }

}
