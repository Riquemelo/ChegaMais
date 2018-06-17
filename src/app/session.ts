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
    create(email: string, pass: string) {
        this.storage.set('email', email);
        this.storage.set('pass', pass);
    }

    get(): Promise<any> {
        return this.storage.get('email');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('email');
        this.storage.remove('pass');
    }

    exist() {
        this.get().then(res => {
            console.log('resultado >>> ', res);
            if(res) {
                console.log('resultado IF');;
                return true;
            } else {
                console.log('resultado else');
                return false;
            }
            
        });
    } 
}