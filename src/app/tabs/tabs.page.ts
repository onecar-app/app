import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { NavController, Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { RequestService } from '../services/generall.service';

// declare let cordova: any;
// const idfaPlugin = cordova.plugins.idfa;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public tab: string = '1';
  isAuth:any = false;

  constructor(public router:Router, public events:EventsService, public navCtrl:NavController, platform: Platform, public request:RequestService) {
    platform.ready().then(() => {
      this.OneSignalInit();
      //this.marketing();
    });
  }

  // marketing(){
  //   let id = idfaPlugin.getInfo()
  //   .then((info:any) => {
  //       if (!info.trackingLimited) {
  //           return info.idfa || info.aaid;
  //       } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
  //           return idfaPlugin.requestPermission().then((result:any) => {
  //               if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
  //                   return idfaPlugin.getInfo().then(info => {
  //                       return info.idfa || info.aaid;
  //                   });
  //               }
  //           });
  //       }
  //   })
  //   .then(idfaOrAaid => {
  //       if (idfaOrAaid) {
  //           console.log(idfaOrAaid);
  //       }
  //   });

  //   alert(id);
  // }

  ionViewWillEnter(){

    this.events.getObservable().subscribe((data) => {
      if(data.event == 'login' || data.event == 'logout') {
        this.tab = '1';
        this.checkAuth();
      }
    })

    this.checkAuth();
  }

  checkAuth(){
    setTimeout(() => {
      if(localStorage.getItem('user')){
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    }, 100);
  }

  async goAuth(){
    this.router.navigateByUrl('/login');
  }
  
  tabChanged($ev:any) {
    console.log($ev)
    //this.navCtrl.navigateRoot('tabs/'+$ev.tab);
    //this.router.navigateByUrl('tabs/'+$ev.tab);
  }


  OneSignalInit(): void {

    //appID - "7dc31e3b-9ee1-4033-903d-882bab34e29d"

    let that = this;

    OneSignal.setAppId("d56d2d4b-ea49-4655-a771-331b7ac59c92");

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });

    this.subscribeLoop();

  }

  subscribeLoop() {
    OneSignal.getDeviceState(async (resp) => {
      if (resp.subscribed == false) {
        setTimeout(() => {
          this.subscribeLoop();
        }, 1000);
      } else {

        this.request.get('update_push_token/'+localStorage.getItem('token')+'/'+resp.userId).then(async res => { })
      }
    })
  }

}
