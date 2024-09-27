import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  //-----------------Para guardar la cedula del que se loguea-----------
  private loggedCedula: string = '';

  saveCedula(cedula: string) {
    this.loggedCedula = cedula;
  }

  getCedula() {
    return this.loggedCedula;
  }

  //-----------------Envia los datos con los que se va a loguear-----------
  login(cedula: string, clave: string): Observable<any> {
    console.log("lo que envio---",cedula,clave);
    return this.http.post<any>(this.apiUrl + "/login", { cedula, clave });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //-----------------Envia los datos con los que se va a loguear-----------
  personas(cedula: string): Observable<any> {
    console.log("LA cedula que se va ", cedula);
    return this.http.post<any>(this.apiUrl + "/personas", {cedula});
  }

  //-----------------************************-----------
  oficios(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/oficios");
  }

  //-----------------************************-----------
  documentos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/documentos");
  }

  //-----------------************************-----------
  agregarPersona(formulario: any, formulario2: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/agregar", {formulario, formulario2});
  }

  //-----------------************************-----------
  agregaroficio(formulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/agregaroficio", {formulario});
  }

  //-----------------************************-----------
  servicioUsuario(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/servicioUsuario");
  }

  //-----------------************************-----------
  agregarServicio(formulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/servicio", {formulario});
  }

  //-----------------************************-----------
  servsoli(id_usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/servsoli", {id_usuario});
  }

  //-----------------************************-----------
  soliserv(id_usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/soliserv", {id_usuario});
  }

  //-----------------************************-----------
  peradmin(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/peradmin");
  }

  //-----------------************************-----------
  aceptar(id_servicio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/aceptar", {id_servicio});
  }

  //-----------------************************-----------
  rechazar(id_servicio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/rechazar", {id_servicio});
  }

}

