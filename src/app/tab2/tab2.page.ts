import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public user: any = {};
  isAuth:any = false;


  constructor(private router: Router,
    public events:EventsService,
    public tabs:TabsPage,
    private navCtrl: NavController) {
  }

  ionViewWillEnter(){
    if(localStorage.getItem('user')){
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  goRules() {
    this.router.navigateByUrl('tabs/tab2/rules');
  }

  goAbout() {
    this.router.navigateByUrl('tabs/tab2/about');
  }

  goPushes() {
    this.router.navigateByUrl('tabs/tab2/pushes');
  }

  goLogin() {
    localStorage.clear();
    this.events.pushData({event:'logout'});
    this.tabs.tab = '1';
    this.router.navigateByUrl('tabs/tab1');
  }

}
