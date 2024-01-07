import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  pdfSrc:any = '';
  dwLink:any = '';
  zoom_to = 0.5;

  header = '';

  constructor(public navCtrl:NavController) { 
    this.pdfSrc = localStorage.getItem('pdf');
    this.dwLink = localStorage.getItem('pdf')?.replace('get_doc','get_document');

    if(this.dwLink.indexOf('diagnosticsReport') > -1) this.header = 'Акт діагностики';
    if(this.dwLink.indexOf('completedWorkReport') > -1) this.header = 'Акт виконаних робіт';
    if(this.dwLink.indexOf('invoice') > -1) this.header = 'Рахунок';
  }

  back() {
    this.navCtrl.back();
  }

  download(){
    
  }
  
  zoom_in() {
    this.zoom_to = this.zoom_to + 0.25;
  }

  zoom_out() {
    if (this.zoom_to > 0.5) {
       this.zoom_to = this.zoom_to - 0.25;
    }
  }


  ngOnInit() {
  }

}
