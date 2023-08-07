export class Convertidor_Tipos {
    /**
     * 
     * @param objetoReferenciaEstructura 
     * @param objetoAModificar  
     * Es muy importante que  la estructura de los objetos sea la misma y que solo cambie
     * los tipos de los datos
     */ 
    public static convertObject(objetoReferenciaEstructura:any, objetoAModificar:any):any{
      let keys = Object.keys(objetoReferenciaEstructura);
      let devolver :any = {};
      for(let i=0; i<keys.length; i++) {
        const key = keys[i];
        const typeofValueObjetoReferencia = typeof objetoReferenciaEstructura[key];
        const typeofValueObjetoAModificar = typeof objetoAModificar[key];
        devolver[key] = objetoAModificar[key]
        if (typeofValueObjetoAModificar != typeofValueObjetoReferencia) {
            switch(typeof objetoReferenciaEstructura[key]) {
                case "number":
                    devolver[key] = new Number(devolver[key]);
                break;
                case "string":
                    devolver[key] = devolver[key];
                break;
                
            }
        }
        
      }
      return devolver;
    }
}