import { Subject, BehaviorSubject } from "rxjs";

export class SubjectManager {
  subject = new Subject();
  getObservable() {
    return this.subject.asObservable();
  }

  get value() {
    return this.subject.value;
  }

  setValue(value) {
    this.subject.next(value);
  }
}

export class BehaviorSubjectManager extends SubjectManager {
  subject = new BehaviorSubject();
}
