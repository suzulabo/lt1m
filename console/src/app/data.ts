import { AppFirebase } from './firebase';

export class AppData {
  constructor(private appFirebase: AppFirebase) {
    console.log(this.appFirebase);
  }
}
