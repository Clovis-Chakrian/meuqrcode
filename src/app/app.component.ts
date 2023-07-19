import { Component, ElementRef, ViewChild } from '@angular/core';
import * as QR from 'qrcode-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('link')
  link!: ElementRef;

  @ViewChild('number')
  number!: ElementRef;

  @ViewChild('message')
  message!: ElementRef;


  @ViewChild('qr')
  qrContainer!: ElementRef;

  title = 'meuqrcode';
  genBtn = document.getElementById('genBtn');
  selectedType = 'link';

  setSelectedType(type: string) {
    this.selectedType = type;
  };

  genQr() {
    switch (this.selectedType) {
      case 'link':
        this.genLinkQr();
        break;

      case 'whatsapp':
        this.genWppQr();
        break;

      default:
        this.genLinkQr();
        break;
    }
  };

  genWppQr() {
    const number = this.number.nativeElement.value;
    const message: string = this.message.nativeElement.value;

    if (!number || !message) {
      alert('Nem o campo número e nem o campo mensagem podem ser nulos.');
      return;
    };

    const qr = QR(5, 'L');
    const wppLink = `https://api.whatsapp.com/send?phone=${number}&text=${message.replaceAll(' ', '%20')}`;

    qr.addData(wppLink);
    qr.make();
    this.qrContainer.nativeElement.innerHTML = qr.createImgTag(4);
  };

  genLinkQr() {
    const link = this.link.nativeElement.value;

    if (!link) {
      alert('Você precisa inserir um link para poder gerar um QR code.')
      return;
    };

    const qr = QR(5, 'L');

    qr.addData(link);
    qr.make();
    this.qrContainer.nativeElement.innerHTML = qr.createImgTag(4);
  };

  downloadQr() {
    const t = this.qrContainer.nativeElement
    const t2 = (document.querySelector('#qr img'))?.getAttribute('src');
    console.log(t2);
    return t2
  }
}
