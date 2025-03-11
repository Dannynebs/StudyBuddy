import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionAnswer } from '../models/question-answer';
import { FavoriteQAInterface } from '../models/favorite.model';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css'
})
export class FavoritesListComponent  implements OnInit{
    
  favoritesList: FavoriteQAInterface[]=[];
  userId = '11111' //Place holder

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getFavorites().subscribe((data) => {
      this.favoritesList = data as any[];
    })
  }
    
}
