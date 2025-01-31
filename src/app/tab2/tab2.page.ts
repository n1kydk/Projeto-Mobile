import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  musicasAdicionadas: any[] = [];
  @ViewChild(IonContent) content!: IonContent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.musicasAdicionadas = history.state.musicasAdicionadas;
    console.log('Músicas recebidas no Tab2:', this.musicasAdicionadas);
  }

  onMusicaAdicionada(musica: any) {
    this.musicasAdicionadas.push(musica);
    console.log('Música adicionada à lista:', musica);
  }

  eliminar(musica: any) {
    this.musicasAdicionadas = this.musicasAdicionadas.filter(m => m !== musica);
  }

  atualizar() {
    window.location.reload();
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(500);
    }
  }

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(500);
    }
  }
}
