import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const arrayNombreFunciones:any = {
  "crear":"",
  "ver":"todos",
  "actualizar":"todos",
  "borrar":0,
  "remplazar":0
};

@Injectable({
  providedIn: 'root'
})
export class UniversalService {
  apiUrl = environment.apiUrl+"/";
  public controllerName:string = "";
  
  //Variable de resultados de Can Activate
  // El nombre del parametro es el de la propiedad
  public objectCanActivate:any = {};
  constructor(private http:HttpClient) { 
    this.getApiURL();
  }
  private getApiURL() {
    this.apiUrl = environment.apiUrl+"/"+ this.controllerName;
  }
  
  /*
  * El contralador aqui se debe de poner como propiedad del servicio.
  */
  canActivateUniversal(funcion:string, campos_Afectados:string) {
    this.getApiURL()
    let api = this.apiUrl+ "/" + funcion ;
    if(campos_Afectados!= ""){
      api = api + "/"+ campos_Afectados;
    }
    api = api +"/can_activate";
    return this.http.get(api) .pipe(
      map((response:any) => {
        if(response.status === 200) {
          this.objectCanActivate[funcion] = true;
          return response;
        }
        this.objectCanActivate[funcion] = false;
        return response;
      }),
      catchError(error => {
        this.objectCanActivate[funcion] = false;      
        return throwError(error);
      })
    );
  }

  canActivateUniversalControllerParameter(nombreController:string,funcion:string, campos_Afectados?:string) {
    this.controllerName = nombreController.toLowerCase();
    this.getApiURL();
    let api = this.apiUrl+ "/" + funcion ;
    if(campos_Afectados && campos_Afectados!= ""){
      api = api + "/"+ campos_Afectados;
    } else{ 
      api = api + "/todos";
    }   
    api = api +"/can_activate";

    return this.http.get(api).pipe(
      map((response:any) => { 
        if(response.status === 200) {
          this.objectCanActivate[funcion] = true;
          return response;
        }
        this.objectCanActivate[funcion] = false;
        return response;
        }),
      catchError(error => {
        this.objectCanActivate[funcion] = false;
        return throwError(error);
      }
      )
    );
  }

  can_create(controllerName: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"crear");
  }

  can_update(controllerName: string, id?: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"actualizar",id);

    this.controllerName = controllerName;
    this.getApiURL();
    if (id) {
      return this.http.get(this.apiUrl + controllerName + '/actualizar/' + id + '/can_activate');
    } else {
      return this.http.get(this.apiUrl + controllerName + '/actualizar/todos/can_activate');
    }
    
  }

  can_get(controllerName: string, id?: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"ver",id);

    this.controllerName = controllerName;
    this.getApiURL();
    if (id) {
      return this.http.get(this.apiUrl + controllerName + '/ver/' + id + '/can_activate');
    } else {
      return this.http.get(this.apiUrl + controllerName + '/ver/todos/can_activate');
    }
  }

  can_delete(controllerName: string, id: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"borrar",id);

    this.controllerName = controllerName;
    this.getApiURL();
    id= ""+0;
    return this.http.get(this.apiUrl + controllerName + '/borrar/' + id+"/can_activate");
  }

  can_replace(controllerName: string, id: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"remplazar",id);

    this.controllerName = controllerName;
    this.getApiURL();
    return this.http.get(this.apiUrl + controllerName + '/remplazar/' + id + '/can_activate');
  }

  can_count(controllerName: string) {
    return this.canActivateUniversalControllerParameter(controllerName,"contar");

    this.controllerName = controllerName;
    this.getApiURL();
    return this.http.get(this.apiUrl + controllerName + '/contar/can_activate');
  }
}
