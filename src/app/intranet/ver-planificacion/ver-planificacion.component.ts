import { Component, OnInit } from '@angular/core';
import { ICabezeraDesplegableConfig, ISuperDesplegableConfig, ISuperTableDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/model/IDesplegableConfig';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';

@Component({
  selector: 'app-ver-planificacion',
  templateUrl: './ver-planificacion.component.html',
  styleUrls: ['./ver-planificacion.component.scss'],
})
export class VerPlanificacionComponent  implements OnInit {
  
 

  constructor(public universalService:UniversalService) { }


 
 
// listas de objetos
  private listaPlanificaciones:any[] = [];
  private listaCampos:any[] = [];
  private listaClientes:any[] = [];
  private listaParcelas:any[] = [];
  private listaMedidas:any[] = [];
  private listaProductos: any[] = [];
  private listaProductosPlanificados: any[] = [];

  private objetoConParcelasOrdenadasPorCampo:any ={};
  private objetoConCamposPorId:any = {};
  private objetoConClientesPorId:any = {};
  private objetoConProductosPorId:any = {};
  private objetoConProductosPlanificacadosOrdenadosPorPlanificacion:any = {};
  private objetoConMedidasPorId:any = {}


  ngOnInit() {
    this.universalService.request("planificacion","ver", "todos").subscribe(
      {
        next:(response:any)=>{
          this.listaPlanificaciones = response;
        },
        error:(error)=>{

        }
      }
    );

    this.universalService.request("campo","ver","todos").subscribe({
      next:(response:any)=>{
        this.listaCampos = response;
        let nombreCampo = "campo_id";
        for (let i=0; i<response.length; i++){
          let elemento = response[i];
          if(typeof this.objetoConCamposPorId[elemento[nombreCampo]] === "undefined"){
            this.objetoConCamposPorId[elemento[nombreCampo]] = elemento;
          }
        }

      }
    });

    this.universalService.request("cliente","ver","todos").subscribe({
      next:(response:any)=>{
        this.listaClientes = response;
        
        let nombreCampo = "cliente_id";
        for (let i=0; i<response.length; i++){
          let elemento = response[i];
          if(typeof this.objetoConClientesPorId[elemento[nombreCampo]] === "undefined"){
            this.objetoConClientesPorId[elemento[nombreCampo]] = elemento;
          }
        }

      }
    });

    this.universalService.request("parcelas","ver","todos").subscribe({
      next:(response:any)=>{

        for (let i=0; i<response.length; i++){
          let parcela = response[i];
          if(typeof this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id] === "undefined"){
            this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id] = [];
          }
          this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id].push(parcela);
        }
      }
    });

    this.universalService.request("unidad_medidas","ver","todos").subscribe({
      next:(response:any)=>{
        this.listaMedidas = response; 
        let nombreCampo = "medida_id";
        for (let i=0; i<response.length; i++){
          let elemento = response[i];
          if(typeof this.objetoConMedidasPorId[elemento[nombreCampo]] === "undefined"){
            this.objetoConMedidasPorId[elemento[nombreCampo]] = elemento;
          }
        }
      }
    });

    this.universalService.request("productos","ver","todos").subscribe({
      next:(response:any)=>{
        this.listaProductos = response;
        let nombreCampo = "productos_id";
        for (let i=0; i<response.length; i++){
          let elemento = response[i];
          if(typeof this.objetoConProductosPorId[elemento[nombreCampo]] === "undefined"){
            this.objetoConProductosPorId[elemento[nombreCampo]] = elemento;
          }
        }
      }
    });
    
    
    this.universalService.request("productos_planificados","ver","todos").subscribe({
      next:(response:any)=>{
        this.listaProductosPlanificados = response;
        let nombreCampo = "productos_planificados_id_planificacion";
        for (let i=0; i<response.length; i++){
          let elemento = response[i];
          if(typeof this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]] === "undefined"){
            this.objetoConParcelasOrdenadasPorCampo[elemento[nombreCampo]] = [];
          }
          this.objetoConParcelasOrdenadasPorCampo[elemento[nombreCampo]].push(elemento);
        }
      }
    });
    
  }

  get configs():ISuperDesplegableConfig[]{
    let returnable:ISuperDesplegableConfig[] = [];

    for (let index = 0; index < this.listaPlanificaciones.length; index++) {
      let objetoConfig!:ISuperDesplegableConfig;
      const planificacion = this.listaPlanificaciones[index];
      let listaParcelasCampo = this.objetoConParcelasOrdenadasPorCampo[planificacion["planificacion_campo_id"]];
      let campo = this.objetoConCamposPorId[planificacion["planificacion_campo_id"]];
      let cliente = this.objetoConClientesPorId[campo["campo_cliente_id"]];
      let cabeceraDesplegableCampo: ICabezeraDesplegableConfig[] = [
        {
          nombre_campo:"Nombre Cliente",
          dato_mostrado: cliente["cliente_nombre"]
        },
        {
          nombre_campo:"Nombre del campo",
          dato_mostrado: campo["campo_nombre"]
        },
        {
          nombre_campo:"Tamaño de facturacion",
          dato_mostrado: campo["campo_tamanyo_facturacion"]
        }
      ];
      
      let dosisTotalCampo:number = 0;

      
      for (let j = 0; j < listaParcelasCampo.length; j++) { 
        let parcela = listaParcelasCampo[j];
        let cabeceraDesplegableParcela: ICabezeraDesplegableConfig[] = [
          {
            nombre_campo:"Nombre Cliente",
            dato_mostrado: cliente["cliente_nombre"]
          },
          {
            nombre_campo:"Nombre del campo",
            dato_mostrado: campo["campo_nombre"]
          },
          {
            nombre_campo:"Tamaño de facturacion",
            dato_mostrado: campo["campo_tamanyo_facturacion"]
          }
        ];
        let listaProductosPlanificados = this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[planificacion["planificacion_id"]??[]]
        let listaProductos:any[]=[];

       
      }
      
    }
    return returnable;
  }


}
