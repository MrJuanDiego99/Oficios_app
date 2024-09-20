import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  cedula: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.cedula, this.contrasena).subscribe(
      (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.authService.saveCedula(this.cedula);
          this.router.navigate(['/dashboard']);
          console.log("Login autorizado", response);
        }else{
          if (response == 2) {
            alert('Contraseña incorrectas');
          }else{
            if (response == 1) {
              alert('Usuario no encontrado');
            }
          }
        }
      },
      (error) => {
        console.error('Error en el login', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
