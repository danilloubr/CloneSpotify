export const environment = {
  production: false
};

export const SpotifyConfifuration = {
  clientId: "15118f7ac6554e90b7eec1c1182333d6",
  authEndPoint: "https://accounts.spotify.com/authorize",
  redirectUrl: "http://localhost:4200/login",
  scopes: [
    "user-read-currently-playing", // ler música tocando agora
    "user-read-recently-played", // ler músicas tocadas recentemente
    "user-read-playback-state", // ler estado do player do usuário
    "user-top-read", // top artistas e musicas do usuario
    "user-modify-playback-state", // alteração do player do usuário
    "user-library-read", // ler biblioteca do usuario
    "playlist-read-private", // ler playlist privada
    "playlist-read-collaborative" // ler playlist colaborativa
  ]
}

