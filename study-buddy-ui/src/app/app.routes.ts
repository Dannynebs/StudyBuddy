import { Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';

export const routes: Routes = [
    {path:'question', component: QuestionListComponent },
    {path:'favoriteList', component: FavoritesListComponent},
    {path: 'qaform', component: QuestionFormComponent}
];
