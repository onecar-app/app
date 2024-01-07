import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-pushes',
  templateUrl: './pushes.page.html',
  styleUrls: ['./pushes.page.scss'],
})
export class PushesPage implements OnInit {


  pushes:any = [];

  constructor(private navCtrl: NavController, public request:RequestService) {
    this.request.get('get_notifications/'+localStorage.getItem('token')).then(res => {
      this.pushes = res.data;
    })
  }

  ngOnInit() {
  }  
  
  back(){
    this.navCtrl.back();
  }

}
