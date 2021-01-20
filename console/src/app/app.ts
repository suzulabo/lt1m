import { AppAuth } from './auth';
import { AppData } from './data';
import { AppFirebase } from './firebase';
import { AppMsg } from './msg';
import { AppRouter } from './router';
import { AppState } from './state';

export class App {
  constructor(
    private appMsg: AppMsg,
    private appState: AppState,
    private appFirebase: AppFirebase,
    private appAuth: AppAuth,
    private appData: AppData,
    private appRouter: AppRouter,
  ) {}

  async init() {
    await Promise.all([this.appFirebase.init()]);
  }

  get msgs() {
    return this.appMsg.msgs;
  }

  readonly state = this.appState.state as Readonly<AppState['state']>;

  readonly router = this.appRouter;

  readonly auth = this.appAuth;

  readonly data = this.appData;
}
