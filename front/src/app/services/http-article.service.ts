import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article';

const url = '/ws';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('cree article http service');
    this.refresh();
  }

  refresh() {
    this.http.get<Article[]>(url + '/articles').subscribe({
      next: (articles) => {
        console.log('articles: ', articles);
        this.articles = articles;
        this.save();
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  add(article: Article) {
    super.add(article);
    this.http
      .post<Article>(url + '/articles', article)
      .subscribe({
        next: (art) => {
          console.log('art: ', art);
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  delete(selectedArticles: Article[]) {
    for (const article of selectedArticles) {
      super.deleteOne(article);
    }
    const ids = selectedArticles.map((a) => a.id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: ids,
    };

    this.http
      .delete<void>(url + '/bulk/articles', options)
      .subscribe({
        next: (art) => {
          console.log('art: ', art);
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  deleteOne(article: Article) {
    super.deleteOne(article);
    this.http
      .delete<void>(url + '/articles/' + article.id)
      .subscribe({
        next: (art) => {
          console.log('art: ', art);
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
