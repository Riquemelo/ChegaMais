import { Storage } from "@ionic/storage";

//pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';


@Injectable()
@NgModule()
export class Session {

    constructor(public storage: Storage){

    }
    // setando uma seção e passando o tipo de usuário
    create(email: string) {
        this.storage.set('email', email);
    }

    get(): Promise<any> {
        return this.storage.get('email');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('email');
        this.get().then(res => {
        });
    }

    exist() {
        let check = null;
        this.get().then(res => {
           
            if(res) {
                check = res;
            } else {
                check = null;
            }  
        });
        return check;
    } 
}