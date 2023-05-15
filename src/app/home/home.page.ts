import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertConfig } from '../core/shared/components/alerts/Models/AlerConfig';
import { Router } from '@angular/router';
import { UsuariosService } from '../core/shared/services/usuarios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public usuariosServices:UsuariosService
  ) { }
  alertConfig: AlertConfig = {
    type: 'success',
    message: 'Este es un mensaje de éxito',
    timer: 5000, // Cerrar después de 5 segundos
    show:false
  };
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit() {
    if(environment.production===false){
      console.log("On Submit entra");
    }
    if (!this.loginForm.invalid) {
      if(environment.production==false){
        console.log("Los datos son validos");
      }
      
      const { username, password } = this.loginForm.value;
      this.usuariosServices.login(username, password)
        .subscribe({
          next: data => {
            if(environment.production===false){
              console.log("Respuesta login:",data);
            }
            console.log("Respuesta login:",data);
            if(data.usuario_token){
              this.router.navigate(['/intranet']); 
            }else{
                
              alert(data.error); 
            }
              
          },
          error: err => {
            if(environment.production==false){
              console.log("Respuesta login:",err);
            }
            switch (err.statusText) {
              case "Unprocessable Entity":
                 alert("Ha ocurrido un error, prueve a actualizar la aplicación");
                break;
            
              default:
                alert('Inicio de sesión fallido.'); 
                break;
            }
           
          },
          complete: () => {
            console.log('Petición completada');
          }
        });
      
    }
  }

    // TODO: Add login logic here
}
