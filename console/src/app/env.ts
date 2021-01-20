export interface AppEnvironment {
  firebaseConfig: {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly databaseURL: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
    measurementId: string;
  };
  readonly functionsRegion: string;
  readonly reCAPTCHASiteKey: string;
  readonly contact: string;
}

export class AppEnv {
  constructor(readonly env: AppEnvironment) {}
}
