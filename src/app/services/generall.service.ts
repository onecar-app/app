import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class RequestService {
  
    public url = 'https://onecar.tech/api/';
    //public url = 'http://onecar.tech/';

    constructor(public http: HttpClient, private loadingCtrl: LoadingController) { }

    async loaderStart() {
        const loading = await this.loadingCtrl.create({
            duration: 3000,
        });

        loading.present();
    }

    get(path: string, loader = true) {
        if(loader) this.loaderStart();

        let promise = new Promise<any>((resolve, reject) => {
            let url = this.url + path;

            this.http.get(url)
                .toPromise()
                .then(res => {
                    this.loadingCtrl.dismiss();
                    resolve(res);
                }).catch(async err => {
                    this.loadingCtrl.dismiss();
                    //await(await this.alertCtrl.create({header:this.translate.instant('ERROR'), message:this.translate.instant(err.error)})).present();
                    reject(err);
                });
        })
        return promise;
    }

    post(path: any, data: any, loader = true) {
        if(loader) this.loaderStart();

        let promise = new Promise<any>((resolve, reject) => {
            let url = this.url + path;

            this.http.post(url, data)
                .toPromise()
                .then(res => {
                    this.loadingCtrl.dismiss();
                    resolve(res);
                }).catch(async err => {
                    this.loadingCtrl.dismiss();
                    //await(await this.alertCtrl.create({header:this.translate.instant('ERROR'), message:this.translate.instant(err.error)})).present();
                    reject(err);
                });
        })
        return promise;
    }

    patch(path: any, data: any, loader = true) {
        if(loader) this.loaderStart();
        
        let promise = new Promise<any>((resolve, reject) => {
            let url = this.url + path;

            this.http.patch(url, data)
                .toPromise()
                .then(res => {
                    this.loadingCtrl.dismiss();
                    resolve(res);
                }).catch(async err => {
                    this.loadingCtrl.dismiss();
                    //await(await this.alertCtrl.create({header:this.translate.instant('ERROR'), message:this.translate.instant(err.error)})).present();
                    reject(err);
                });
        })
        return promise;
    }

    delete(path: any, loader = true) {
        if(loader) this.loaderStart();
        
        let promise = new Promise<any>((resolve, reject) => {
            let url = this.url + path;

            this.http.delete(url)
                .toPromise()
                .then(res => {
                    this.loadingCtrl.dismiss();
                    resolve(res);
                }).catch(async err => {
                    this.loadingCtrl.dismiss();
                    //await(await this.alertCtrl.create({header:this.translate.instant('ERROR'), message:this.translate.instant(err.error)})).present();
                    reject(err);
                });
        })
        return promise;
    }
}