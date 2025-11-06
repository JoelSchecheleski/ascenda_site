import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  date:number = new Date().getFullYear()
}
