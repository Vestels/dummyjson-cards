import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root',
})
export class CardfeedsService {
  private apiUrl: string = 'https://dummyjson.com/posts';
  currentCard: any;
  currentCardTags: any;
  cards: any;
  comments: any;
  inputTag: string = '';
  sortTags: string[] = []
  badgeTheme: boolean = true;
  canReset: boolean = false;
  footerOff: boolean = false;
  constructor(private route: Router, private regComp: RegisterComponent) {
    this.getData();
  }
  async getComments(id: string) {
    try {
      const response = await fetch(this.apiUrl + '/' + id + '/comments');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if (json.comments.length > 0) {
      this.comments = json;
      } else {
        this.comments === undefined
      }
    } catch (error) {
      console.error(error);
    }
  }
  checkComments():boolean {
    return this.comments?.comments === undefined  
  }
  async getData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      this.cards = json;      
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCard(cardId: number) {
    try {
      const response = await fetch(this.apiUrl + '/' + cardId, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      for (const object of this.cards.posts) {
        if (object.id === json.id) {
          console.log('was the DELETE successfull:  ' + json.isDeleted);
          console.log(json.deletedOn);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async updateCard() {
    try {
      const response = await fetch(this.apiUrl + '/' + this.currentCard.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.currentCard.title,
          body: this.currentCard.body,
          tags: this.currentCardTags,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      console.log('UPDATE was successfull to this: ');
      console.log(json);
      this.footerOff = false;
    } catch (error) {
      console.error(error);
    }
  }
  async loadForEdit(cardId: any) {
    try {
      const response = await fetch(this.apiUrl + '/' + cardId);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      this.currentCard = json;
      this.currentCardTags = json.tags;
      this.route.navigate(['editCards']);
    } catch (error) {
      console.error(error);
    }
  }
  async sortyByTag(tagName: string){
    let sortedCardArray = []
    for (const post of this.cards.posts) {     
      if (post.tags.includes(tagName)) {
        sortedCardArray.push(post)
        this.cards.posts = sortedCardArray
      }
    }
    if (!this.sortTags.includes(tagName)) {
      this.sortTags.push(tagName)
    }
    console.log(this.cards.posts);    
    this.route.navigate(['/cards'])
  }
  resetFilters() {
    this.route.navigate(['cards'])
    this.sortTags = []
    this.getData()
  }
  async removeTagFilter(i: any) {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      this.cards = json;      
    } catch (error) {
      console.error(error);
    }
    this.sortTags.splice(i, 1);
    for (const tag of this.sortTags) {
      this.sortyByTag(tag)
    }
    this.route.navigate(['cards'])
  }
  inputValidation() {
    return (
      this.regComp.hungarianLetters.test(this.inputTag) ||
      this.inputTag.length < 2
    );
  }
  inputReset() {
    this.inputTag = '';
  }
  addTag() {
    this.currentCardTags.push(this.inputTag);
    this.inputTag = '';
    this.canReset = true;
  }
  removeTag(i: any) {
    this.currentCardTags.splice(i, 1);
    this.canReset = true;
  }
  storeTitleValue(id: any) {
    this.currentCard.title = id;
    this.canReset = true;
  }
  storeBodyValue(id: any) {
    this.currentCard.body = id;
    this.canReset = true;
  }
  storeInputValue(id: any) {
    this.inputTag = id;
  }
  async resetChanges(cardId: any) {
    try {
      const response = await fetch(this.apiUrl + '/' + cardId);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      let json = await response.json();
      this.currentCard = json;
      this.currentCardTags = json.tags;
      this.canReset = false;
    } catch (error) {
      console.error(error);
    }
  }
  checkExistingData() {
    return this.cards !== undefined;
  }
}