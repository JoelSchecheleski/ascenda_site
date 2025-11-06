import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Navbar, 
    Footer
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

}
