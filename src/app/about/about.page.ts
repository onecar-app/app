import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
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



  constructor(private navCtrl: NavController) {
    this.showBack = window.location.href.includes('tab2')
  }

  ngOnInit() {
    this.loadMap();
  }
  
  loadMap() {
    let latLng = new google.maps.LatLng(50.4308801, 30.6309547);
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
