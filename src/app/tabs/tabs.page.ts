import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public tab: string = '1';
  isAuth:any = false;

  constructor(public router:Router, public events:EventsService, public navCtrl:NavController) {}

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

}
