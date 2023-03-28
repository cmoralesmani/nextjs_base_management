// src/services/title.service.js

import { BehaviorSubject } from "rxjs";

const titleSubject = new BehaviorSubject("");

export const titleService = {
  title: titleSubject.asObservable(),
  get titleValue() {
    return titleSubject.value;
  },
  setTitle,
};

function setTitle(title) {
  titleSubject.next(title);
}
