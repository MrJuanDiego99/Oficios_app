import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'

})
export class DashboardComponent {

  datos: any;
  oficios: any;
  servicioUsuario: any;


  admin = false;


  selectedUsu: any = {
    num_identificacion: '',
    clave: '',
    nombres: '',
    apellidos: '',
    celular: '',
    correo: '',
    direccion: '',
    rol: '',
  }

  selectedUsuSer: any = {
    id_oficio: '',
    detalle: '',
    precio_servicio: '',
  }



constructor(private authService: AuthService, private router: Router) {}

 ngOnInit() {
  const cedula = this.authService.getCedula();

  //--------------Trea los datos de la persona que se loguea y si es el admin activa la bandera para mostrar el boton de registrar-----------
  if (cedula) {
    this.authService.personas(cedula).subscribe(
      data => {
        this.datos = data;
        console.log("datos", this.datos);
        if (this.datos.info2.rol == 'A') {
          this.admin = true
        }

      });
  }

  //-------------- Me trae todos los oficios activos de la BD  -----------
  this.authService.oficios().subscribe(
    data => {
      this.oficios = data;
      console.log("oficios", this.oficios);
    });

    //-------------- Me trae todos los oficios activos de la BD  -----------
  this.authService.servicioUsuario().subscribe(
    data => {
      this.servicioUsuario = data;
      console.log("servicioUsuario", this.servicioUsuario);
    });
 }

 //-------------Manda la info para crear
 btnguardar(){
  var formulario = this.selectedUsu
  var formulario2 = this.selectedUsuSer
  this.authService.agregarPersona(formulario, formulario2).subscribe(
    (response) => {
      if (response) {
        console.log("Guardado con exito", response);
        alert('Guardado con exito');
        location.reload()
      }
    },
      (error) => {
        console.error('Error al hacer la solicitud', error);
        alert('Error al hacer la solicitud');
      }
  );
 }
}
