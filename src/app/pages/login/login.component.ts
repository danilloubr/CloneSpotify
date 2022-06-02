import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }


// redireciona para a pagina de autorização de conta do usuario.
  abrirPaginaLogin(){
    window.location.href = this.spotifyService.obterUrlLogin()
  }

}
