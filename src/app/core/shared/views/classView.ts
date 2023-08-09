import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UniversalService } from "../services/universal/universal.service";

export class ClassView {
    public nombreControlador: string = "";
    public can_ver: boolean = false;
    public can_editar: boolean = false;
    public can_borrar: boolean = false;
    public can_agregar: boolean = false;
    constructor(
        public claseAAplicar: string,
        public universalService: UniversalService,
        public rutaActiva: ActivatedRoute, 
    ) {
        this.claseAAplicar = "margin-left-menu-desplegado";
        this.can_ver = false;
        this.can_editar = false;
        this.can_borrar = false;
        this.can_agregar = false;
    }

    public alInicio( ) {
        let ruta = this.rutaActiva.snapshot.params['controlador'];
        this.nombreControlador = ruta;
        console.log("nombre:",this.nombreControlador);
        this.universalService.can_get(this.nombreControlador).subscribe({
            next: (data) => {
              this.can_ver = true;
              console.log("ver:",data);
            },
            error: (error) => {
              this.can_ver = false;
            }
        });

        this.universalService.can_update(this.nombreControlador).subscribe({
            next: (data) => {
              this.can_editar = true;
              console.log("editar:",data);
            },
            error: (error) => {
              this.can_editar = false;
            }
        });

        this.universalService.can_delete(this.nombreControlador,0+"").subscribe({
            next: (data) => {
                this.can_borrar = true;
                console.log("borrar:",data);

            },
            error: (error) => {
                this.can_borrar = false;
            }
        });

        this.universalService.can_create(this.nombreControlador).subscribe({
            next: (data) => {
                this.can_agregar = true;
                console.log("create:",data);
            },
            error: (error) => {
                this.can_agregar = false;
            }
        });
    }

    seAbrioMenu(menuAvierto:boolean) {
        this.claseAAplicar = "";
        if(menuAvierto == true){ 
            this.claseAAplicar = "margin-left-menu-desplegado";
        }
    }
}