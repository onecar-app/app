import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router, platform: Platform) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let video = document.getElementById("video");
    
    setTimeout(() => {
      //video?.remove();
      this.router.navigateByUrl('/tabs', {replaceUrl:true});
    }, 6000);
  }

}
