import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  template: '<p>Redirigiendo...</p>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
