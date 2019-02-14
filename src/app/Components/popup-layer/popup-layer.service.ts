import { ComponentRef, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PopupLayerService {
  private contentType: Type<any>;
  private showEmitter = new Subject<boolean>();
  private setContentEmitter = new Subject<{content: Type<any>, pams: any}>();
  private contentChangedEmitter = new Subject<ComponentRef<Type<any>>>();
  showChanged$ = this.showEmitter.asObservable();
  setContentRequested$ = this.setContentEmitter.asObservable();
  contentChanged$ = this.contentChangedEmitter.asObservable();
  isResolve;
  contentPromise;
  constructor() {
    this.showEmitter.next(false);
  }
  showLayer() {
    this.showEmitter.next(true);
  }
  hideLayer() {
    this.showEmitter.next(false);
  }
  setContent(content: Type<any>, pams: any) {
    this.contentPromise =  new Promise((resolve) => {
      this.contentType = content;
      this.isResolve = resolve;
      this.setContentEmitter.next({content: content, pams: pams});
    });
    return this.contentPromise;
  }
  currentContentType(): Type<any> {
    return this.contentType;
  }
  contentChanged(comp: ComponentRef<Type<any>>) {
    this.isResolve(comp);
    this.contentChangedEmitter.next(comp);
  }
}
