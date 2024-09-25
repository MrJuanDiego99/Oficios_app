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
  documentos: any;
  servicioUsuario: any;
  servsoli: any;
  soliserv: any;
  peradmin: any;


  admin = false;
  cliente = false;
  trabajador = false;
  mensaje = true;



  selectedUsu: any = {
    num_identificacion: '',
    clave: '',
    nombres: '',
    apellidos: '',
    celular: '',
    correo: '',
    direccion: '',
    rol: '',
    id_tipo_documento:'',
    editable: false
  }

  selectedUsuSer: any = {
    id_oficio: '',
    detalle: '',
    precio_servicio: '',
  }

  selectedServ: any = {
    id_usuario: '',
    id_usuario_oficio: '',
    valor_servicio: '',
  }

  selectedOfic: any = {
    oficio: '',
  }



constructor(private authService: AuthService, private router: Router) {}

 ngOnInit() {
  const cedula = this.authService.getCedula();

  //--------------Trea los datos de la persona que se loguea y si es el admin activa la bandera para mostrar el boton de registrar-----------
  if (cedula) {
    this.authService.personas(cedula).subscribe(
      data => {
        this.datos = data;
        console.log("datos persona logueada", this.datos);
        let id_usuario = this.datos.info2.id_usuario
        if (this.datos.info2.rol == 'A'){
          this.authService.peradmin().subscribe(
            data2 => {
              this.peradmin = data2.info2;
              if (this.peradmin.length > 0) {
                console.log("Los servicios que ha contratado ADMIN", this.peradmin);
              }else{
                this.mensaje = false;
              }
            },
            (error) => {
              console.error('Error al hacer la consulta', error);
              alert('Error al hacer la solicitud');
            });

          this.admin = true
        }else{

          if  (this.datos.info2.rol == 'C'){
            this.authService.servsoli(id_usuario).subscribe(
              data2 => {
                this.servsoli = data2.info2;
                if (this.servsoli.length > 0) {
                  console.log("Los servicios que ha contratado CLIENTE", this.servsoli);
                }else{
                  this.mensaje = false;
                }
              },
              (error) => {
                console.error('Error al hacer la consulta', error);
                alert('Error al hacer la solicitud');
              });
            this.cliente = true
          }else{

            if (this.datos.info2.rol == 'T') {
              this.authService.soliserv(id_usuario).subscribe(
              data2 => {
                this.soliserv = data2.info2;
                if (this.soliserv.length > 0) {
                  console.log("Los servicios que ha contratado TRABAJADOR", this.soliserv);
                }else{
                  this.mensaje = false;
                }
              },
              (error) => {
                console.error('Error al hacer la consulta', error);
                alert('Error al hacer la solicitud');
              });
              this.trabajador = true
            }else{

              if (this.datos.info2.rol == 'D'){
                this.authService.soliserv(id_usuario).subscribe(
                  data2 => {
                    this.soliserv = data2.info2;
                    if (this.soliserv.length > 0) {
                      console.log("Los servicios que ha contratado TRABAJADOR", this.soliserv);
                    }else{
                      this.mensaje = false;
                    }
                  },
                  (error) => {
                    console.error('Error al hacer la consulta', error);
                    alert('Error al hacer la solicitud');
                  });

                  this.authService.servsoli(id_usuario).subscribe(
                    data2 => {
                      this.servsoli = data2.info2;
                      if (this.servsoli.length > 0) {
                        console.log("Los servicios que ha contratado CLIENTE", this.servsoli);
                      }else{
                        this.mensaje = false;
                      }
                    },
                    (error) => {
                      console.error('Error al hacer la consulta', error);
                      alert('Error al hacer la solicitud');
                    });
                this.trabajador = true
                this.cliente = true
              }
            }
          }
        }
      },
      (error) => {
        console.error('Error al hacer la consulta', error);
        alert('Error al hacer la solicitud');
      }
    );
  }

  //-------------- Me trae todos los oficios activos de la BD  -----------
  this.authService.oficios().subscribe(
    data => {
      this.oficios = data.oficios;
      console.log("oficios", this.oficios);
    });

    //-------------- Me trae todos los tipos de documento activos de la BD  -----------
  this.authService.documentos().subscribe(
    data => {
      this.documentos = data.documentos;
      console.log("documentos", this.documentos);
    });


  //-------------- Me trae todas las personas registradas y activos de la BD  -----------
  this.authService.servicioUsuario().subscribe(
    data => {
      this.servicioUsuario = data.serviciosusu;
      console.log("servicioUsuario", this.servicioUsuario);
  });
 }

 //-------------Manda la info para crear--------------------
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

 //-------------Manda la info para crear oficio--------------------
 btnagregaroficio(){
  var formulario = this.selectedOfic
  this.authService.agregaroficio(formulario).subscribe(
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

//-------------Manda la info para contratar--------------------
 contratar(item: any){

  this.selectedServ.id_usuario = this.datos.info2.id_usuario
  this.selectedServ.id_usuario_oficio = item.id_usuario_oficio
  this.selectedServ.valor_servicio = Number(item.precio_servicio)

  var formulario = this.selectedServ
  console.log(formulario);

  this.authService.agregarServicio(formulario).subscribe(
    (response) => {
      if (response) {
        console.log("Guardado con exito", response);
        alert('Solicitud realizada con éxito');
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
