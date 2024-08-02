import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    // Redirigir a la URL de SSO para la autenticación
    window.location.href = 'http://127.0.0.1:8000/login/sso';
  }
}
