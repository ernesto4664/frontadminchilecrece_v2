import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ssoLoginUrl = 'http://127.0.0.1:8000/login/sso'; // URL de la ruta de inicio de sesión SSO

  constructor(private http: HttpClient) {}

  redirectToSSOLogin(): void {
    window.location.href = this.ssoLoginUrl;
  }
}
