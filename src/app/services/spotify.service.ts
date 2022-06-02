import { Injectable } from '@angular/core';
import { SpotifyConfifuration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  obterUrlLogin(){
    const authEndPoint = `${SpotifyConfifuration.authEndPoint}?`
    const clientId = `client_id=${SpotifyConfifuration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfifuration.redirectUrl}&`
    const scopes = `scopes=${SpotifyConfifuration.scopes.join("%20")}&`
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType
  }
}
