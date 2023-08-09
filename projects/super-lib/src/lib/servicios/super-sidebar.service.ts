import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SuperSidebarService{ 
 
    public set enlaces(v : string) {
        this.enlaces = v;
    }
    
    public get enlaces() : string {
        return this.enlaces;
    }
 
 
}