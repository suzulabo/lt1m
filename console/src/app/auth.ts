import { AppFirebase } from './firebase';
import { AppRouter } from './router';
import { AppState } from './state';

export class AppAuth {
  constructor(
    private appFirebase: AppFirebase,
    private appState: AppState,
    private router: AppRouter,
  ) {}

  updateAuthState() {
    this.appState.updateSignIn(this.appFirebase.user != null);
  }

  readonly signIn = {
    google: async () => {
      await this.appFirebase.signInGoogle();
    },
  };

  async signOut() {
    await this.appFirebase.signOut();
    this.updateAuthState();
    await this.router.push('/signin', 'root');
  }
}
