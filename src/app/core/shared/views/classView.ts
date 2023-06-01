import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

export class ClassView {
    public nombreControlador: string = "";
    

    constructor(public claseAAplicar: string, public rutaActiva: ActivatedRoute) {
        this.claseAAplicar = "margin-left-menu-desplegado";
    }

    public alInicio( ) {
        let ruta = this.rutaActiva.snapshot.params['controlador'];
        this.nombreControlador = ruta;
        console.log("nombre:",this.nombreControlador);
    }

    seAbrioMenu(menuAvierto:boolean) {
        this.claseAAplicar = "";
        if(menuAvierto == true){ 
            this.claseAAplicar = "margin-left-menu-desplegado";
        }
    }
}