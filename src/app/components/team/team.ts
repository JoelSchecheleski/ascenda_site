import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  teamData =[
    {
      image:'assets/images/client/perfil_joel.jpg',
      name:'Joel Schecheleski',
      title:'TI'
    },
    {
      image:'assets/images/client/perfil_joel.jpg',
      name:'Joel Schecheleski',
      title:'TI'
    },
    {
      image:'assets/images/client/perfil_joel.jpg',
      name:'Joel Schecheleski',
      title:'TI'
    },
    {
      image:'assets/images/client/perfil_joel.jpg',
      name:'Joel Schecheleski',
      title:'TI'
    },
  ]
}
