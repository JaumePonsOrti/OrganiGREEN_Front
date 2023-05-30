import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

export class ClassView {
    public nombreControlador: string = "";
    public rutaActiva: ActivatedRoute = new ActivatedRoute();
    constructor( ) {
        
    }

    public alInicio( ) {
        let ruta = this.rutaActiva.snapshot.params['controlador'];
        this.nombreControlador = ruta;
        console.log("nombre:",this.nombreControlador);
    }

}