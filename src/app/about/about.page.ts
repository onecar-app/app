import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
declare var google: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map: any;
  showBack = false;
  content:any = {};



  constructor(private navCtrl: NavController, public http:RequestService) {
    this.showBack = window.location.href.includes('tab2')
    this.getContent();
  }

  getContent(){
    this.content = JSON.parse(localStorage.getItem('content') as any);

    this.http.get('content').then(res => {
      this.content = res.data;
      localStorage.setItem('content', JSON.stringify(res.data));
    })
  }

  ngOnInit() {
    this.getContent();
    this.loadMap();
  }
  
  loadMap() {
    let coords = this.content?.about_coords.split(",");
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    
  }

  back(){
    this.navCtrl.back();
  }
}
