import { RouterEventDetail } from '@ionic/core';
import { Component, h, State } from '@stencil/core';
import { App } from 'src/app/app';
import { AppAuth } from 'src/app/auth';
import { AppData } from 'src/app/data';
import { AppEnv } from 'src/app/env';
import { AppFirebase } from 'src/app/firebase';
import { AppMsg } from 'src/app/msg';
import { AppRouter } from 'src/app/router';
import { AppState } from 'src/app/state';
import { _appEnv } from 'src/appenv.env';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  private app: App;
  private nav: HTMLIonNavElement;

  @State()
  initializing = true;

  componentWillLoad() {
    const appEnv = new AppEnv(_appEnv);
    const appMsg = new AppMsg();
    const appState = new AppState();
    const appRouter = new AppRouter();
    const appFirebase = new AppFirebase(appEnv, appMsg);
    const appData = new AppData(appFirebase);
    const appAuth = new AppAuth(appFirebase, appState, appRouter);
    this.app = new App(appMsg, appState, appFirebase, appAuth, appData, appRouter);

    void this.init();
  }

  private async init() {
    this.initializing = true;
    try {
      await this.app.init();
      this.initializing = false;
    } finally {
    }
  }

  private renderRoute(url: string, component: string) {
    return <ion-route url={url} component={component} componentProps={{ app: this.app }} />;
  }

  private handleRotueWillChange = (event: CustomEvent<RouterEventDetail>) => {
    if (this.app.state.signIn) {
      if (event.detail.to.startsWith('/signin')) {
        this.app.router.push('/', 'root');
      }
    } else {
      if (!event.detail.to.startsWith('/signin')) {
        this.app.router.push('/signin', 'root');
      }
    }
  };

  private handleNavRef = (v: HTMLIonNavElement) => {
    this.nav = v;
  };

  private handleNavDidChange = async () => {
    const view = await this.nav.getActive();
    if (hasPageEnter(view.element)) {
      void view.element.pageEnter();
    }
  };

  render() {
    if (this.initializing) {
      return (
        <ion-app>
          <ion-content class="app-init">
            <div class="app-init">
              <ion-spinner color="secondary"></ion-spinner>
            </div>
          </ion-content>
        </ion-app>
      );
    }

    return (
      <ion-app>
        <ion-router useHash={false} onIonRouteWillChange={this.handleRotueWillChange}>
          {this.renderRoute('/signin', 'app-signin')}
          {this.renderRoute('/', 'app-home')}
        </ion-router>
        <ion-nav ref={this.handleNavRef} onIonNavDidChange={this.handleNavDidChange} />
      </ion-app>
    );
  }
}

const hasPageEnter = (
  v: any,
): v is {
  pageEnter: () => Promise<void>;
} => {
  return v && typeof v.pageEnter == 'function';
};
