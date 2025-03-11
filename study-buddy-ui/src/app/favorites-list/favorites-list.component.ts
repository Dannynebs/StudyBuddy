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
    
  favoriteList: FavoriteQAInterface[]=[];
  FavoritesListResult: FavoriteQAInterface[] = [];
  QuestionsAnswersList: QuestionAnswer[] = [];
  FavoriteQuestion: FavoriteQAInterface = {} as FavoriteQAInterface;
  Question: QuestionAnswer = {} as QuestionAnswer;
  toggleAnswer: boolean = false;

  userId = '11111' //Place holder

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getFavorites().subscribe((data) => {
      this.favoriteList = data as any[];
    })
  }
  newFavorite(addFavorite: any) {
    if (!addFavorite.questionId.trim() || !addFavorite.userId.trim()) {
      console.error('Both question and answer are required');
      return;
    }
    this.apiService.addFavorite(addFavorite).subscribe((res) => {
      console.log(res);
      this.favoriteList.push(res as any);
      addFavorite.questionId = '';
      addFavorite.userId = '';
    });
  }
  ShowFavorites() {
    this.apiService.getFavorites().subscribe((res) => {
      console.log(res);
      this.FavoritesListResult = res as any[];
    });
  }
    
  showAnswer(question: any): void {
    question.toggleAnswer = !question.toggleAnswer;
  }
}
