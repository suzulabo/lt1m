import { createStore } from '@stencil/store';

interface State {
  signIn: boolean;
}

const { state: appState } = createStore({} as State);

export class AppState {
  readonly state = appState as Readonly<State>;

  updateSignIn(v: boolean) {
    appState.signIn = v;
  }
}
