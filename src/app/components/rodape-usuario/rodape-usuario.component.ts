import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {
  iconeSair = faSignInAlt
  usuario: IUsuario = null

  constructor(
    private spotifyService: SpotifyService
    ) { }

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario
  }

  sair(){
    this.spotifyService.sair()
  }

}
