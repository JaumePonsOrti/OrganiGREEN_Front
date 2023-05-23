import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Debug } from '../../helpers/Debug';
import { Enlace_Menu } from '../../models/enlace_menu';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends Debug{
  public menus:any;
  

  apiUrl:string = environment.apiUrl+"/menu";
  constructor(private http: HttpClient) {
    super(true);
   
  }

  getMenuDeApi(): Observable<any> {
    return this.http.get(this.apiUrl+'/get') .pipe(
      map(response => {
       
        this.menus = response;
        this.menus = this.menus.menus;
        this.log("Menu",this.menus);
        return response;
      }),
      catchError(error => {
      
        //this.username = '';
      
        return throwError(error);
      })
    );
  }
  
  
}
