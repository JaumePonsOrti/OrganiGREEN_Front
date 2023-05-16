import { environment } from "src/environments/environment";

export class Debug {
    public debugueable:boolean = false;
    constructor(debug:boolean) {
        this.debugueable=debug;
    }
    log(message?:any, ...optionalParams: any[]){

        if(environment.production===false){
           
            if(this.debugueable===true){
                console.log(message,optionalParams)
            
            } 
        }
        

    }
}