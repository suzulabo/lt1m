import { RouterDirection } from '@ionic/core';

export class AppRouter {
  private get router() {
    return document.querySelector('ion-router');
  }

  async push(url: string, direction?: RouterDirection) {
    return this.router.push(url, direction);
  }
}
