import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../../models/Contact';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl; // Cambiar por la url de la API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private userS:UsuariosService) { }

  saveContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl+"/contactos/", contact);
  }

  getContactos(): Observable<Contact[]> {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userS.token // Reemplazar "token" con tu token real
      })
    };
    const url = `${this.apiUrl}/contactos/`;
    return this.http.get<Contact[]>(url, this.httpOptions);
  }

  
}