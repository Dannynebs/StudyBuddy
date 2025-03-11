import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionAnswer } from './models/question-answer';
import { Favorite } from './models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7274/api';
  constructor(private http: HttpClient) { }

  //userId: string 

  
  getQuestionsAnswers() {
    return this.http.get(`${this.baseUrl}/Qas`);
  }
  getQuestionById(id: number){
    this.http.get(`${this.baseUrl}/Qas/${id}`)
  }
  addQuestionAnswer(question: QuestionAnswer){
    return this.http.post(`${this.baseUrl}/Qas`,question)
  }
  editQuestionAnswer(id: number, question: QuestionAnswer){
    return this.http.put(`${this.baseUrl}/Qas/${id}`,question)
  }
  deleteQuestionAnswer(id: number){
    return this.http.delete(`${this.baseUrl}/Qas/${id}`)
  }

  //Favorites
  addFavorite(favorite: Favorite){
  return this.http.post(`${this.baseUrl}/UserFavorites`, favorite);
  }
  getFavorites(){
    return this.http.get(`${this.baseUrl}/UserFavorites`);
  }
  deleteFavorite(){

  }
}
