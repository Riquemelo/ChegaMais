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
        console.log('email >>> ', email);
        this.storage.set('email', email);
        this.get().then(res => {
            console.log('resultado >>> ', res);
        });
    }

    get(): Promise<any> {

        return this.storage.get('email');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('email');
        this.get().then(res => {
            console.log('resultado >>> ', res);
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
        console.log(check);
        return check;
    } 
}