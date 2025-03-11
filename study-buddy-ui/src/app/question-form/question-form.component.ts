import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { QuestionAnswer } from '../models/question-answer';
@Component({
  selector: 'app-question-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  QuestionAnswerList: QuestionAnswer[] = [];
  question: QuestionAnswer = {} as QuestionAnswer;

  constructor(private apiService: ApiService) {}

  newQuestion(addQuestion: any) {
    if (!addQuestion.question.trim() || !addQuestion.answer.trim()) {
      console.error('Both question and answer are required');
      return;
    }
    this.apiService.addQuestionAnswer(addQuestion).subscribe((res) => {
      console.log(res);
      this.QuestionAnswerList.push(res as any);
      addQuestion.question = '';
      addQuestion.answer = '';
    });
  }
}
