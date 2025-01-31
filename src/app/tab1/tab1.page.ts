import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  musica: string = '';
  musicas: any[] = [];
  public musicasAdicionadas: any[] = []; 

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) {}

  async handleSearch() {
    if (this.musica.trim() === '') {
      const alert = await this.alertController.create({
        header: 'ALERTA',
        message: 'Você deve adicionar uma música.',
        buttons: ['ACEITAR'],
      });
      await alert.present();
      return;
    }

    try {
      const url =
        `https://spotify23.p.rapidapi.com/search/?q=${this.musica}&type=multi&offset=1&limit=20&numberOfTopResults=5`;

      const options = {
        headers: new HttpHeaders({
          'X-RapidAPI-Key': '36c7f28caamshc2954bde752386fp124ea5jsncc77a83225a9',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        }),
      };

      const res: any = await this.http.get(url, options).toPromise();
      this.musicas = res.tracks.items;
    } catch (error) {
      console.log(`ups... erro: ${error}`);
    }
  }


  async adicionarMusicas(musica: any) {
    if (this.musicasAdicionadas.push(musica)){
      console.log('Música adicionada à lista:', musica.data.name, musica);
      this.router.navigate(['/tabs/tab2'], { state: { musicasAdicionadas: this.musicasAdicionadas } });
    }
  }
}
