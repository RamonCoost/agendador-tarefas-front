import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { every, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit, OnDestroy {
  appLogo = "assets/logo-agendador-javanauta.png";

  rotaAtual: string = '';
  inscricaoRota!: Subscription;

  constructor(private router: Router) {}

   ngOnInit(): void {
      this.rotaAtual = this.router.url
      this.inscricaoRota = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((evento: NavigationEnd) => {
          this.rotaAtual = evento.url //troca a rota atual com base na URL
          console.log("rotaAtual:", this.rotaAtual)
        })
    }

    ngOnDestroy(): void {
      this.inscricaoRota.unsubscribe();
    }

    estaNaRotaRegister(): boolean{
      return this.rotaAtual === '/register'
    }
}
