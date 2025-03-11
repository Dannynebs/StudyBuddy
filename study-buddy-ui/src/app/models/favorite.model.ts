export interface FavoriteQAInterface {
    favoriteId: number;
    userId: string;
    questionId: number;
    question: QuestionAnswerInterface ;
  }
  export interface QuestionAnswerInterface {
    id: number;
    question: string;
    answer: string;
  }

  export interface Favorite {
    id: number;
    favoriteId: number;
    userId: string;
    questionId: number;
    answerId: string;
}