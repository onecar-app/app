import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
})
export class RulesPage implements OnInit {
  content:any = [];

  constructor(private navCtrl: NavController, public http:RequestService) {
    this.getContent();
  }

  ngOnInit() {
  }

  getContent(){
    this.content = JSON.parse(localStorage.getItem('content') as any);

    this.http.get('content').then(res => {
      this.content = res.data;
      localStorage.setItem('content', JSON.stringify(res.data));
    })
  }


  back(){
    this.navCtrl.back();
  }

}
