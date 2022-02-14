import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  senhaEntry: string;
  tipoEntry: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmarSenha(event: any) {
    this.senhaEntry = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoEntry = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoEntry;
    if (this.usuario.senha != this.senhaEntry) {
      this.alertas.showAlertDanger('A senha digitada não confere!');
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar']);
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!');
      });
    }
  }
}
