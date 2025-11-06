import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './get-in-touch.html',
  styleUrl: './get-in-touch.scss'
})
export class GetInTouch {

}
