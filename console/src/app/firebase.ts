import { Build } from '@stencil/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { AppEnv } from './env';
import { AppMsg } from './msg';

/*
import FieldValue = firebase.firestore.FieldValue;
import Timestamp = firebase.firestore.Timestamp;

const fsHelper = {
  announce: new AnnounceHelper<FieldValue>(),
  announceMeta: new AnnounceMetaHelper<FieldValue>(),
  post: new PostHelper<FieldValue>(),
};

const getCacheFirst = async <T>(docRef: firebase.firestore.DocumentReference<T>) => {
  {
    try {
      const doc = await docRef.get({ source: 'cache' });
      if (doc.exists) {
        console.debug('hit cache:', docRef.path);
        return doc.data();
      }
    } catch {}
  }
  {
    const doc = await docRef.get({ source: 'default' });
    if (doc.exists) {
      return doc.data();
    }
  }
};
*/

export class AppFirebase {
  private functions: firebase.functions.Functions;
  private firestore: firebase.firestore.Firestore;
  private auth: firebase.auth.Auth;

  constructor(
    private appEnv: AppEnv,
    private appMsg: AppMsg,
    private _firebaseApp?: firebase.app.App,
  ) {}

  private devonly_setEmulator() {
    if (!Build.isDev) {
      return;
    }
    console.log('useEmulator');
    this.functions.useEmulator(location.hostname, 5001);
    this.firestore.settings({ ssl: false, host: `${location.hostname}:8080` });
    this.auth.useEmulator(`http://${location.hostname}:9099`);
  }

  private announcesListener: () => void = null;

  async init() {
    if (this._firebaseApp) {
      return;
    }

    this._firebaseApp = firebase.initializeApp(this.appEnv.env.firebaseConfig);
    this.functions = this._firebaseApp.functions(this.appEnv.env.functionsRegion);
    this.firestore = this._firebaseApp.firestore();
    this.auth = this._firebaseApp.auth();
    this.devonly_setEmulator();

    await this.firestore.enablePersistence();

    await new Promise<void>(resolve => {
      this.auth.onAuthStateChanged(() => {
        resolve();
      });
    });
    this.auth.languageCode = this.appMsg.lang;
  }

  get user() {
    return this.auth.currentUser;
  }

  async signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    await this.auth.signInWithRedirect(provider);
  }

  async signOut() {
    if (this.announcesListener) {
      this.announcesListener();
      this.announcesListener = null;
    }
    await this.auth.signOut();
  }

  /*
  private async callFunc<T>(name: string, params: any): Promise<T> {
    const f = this.functions.httpsCallable(name);
    const res = await f(params);
    return res.data as T;
  }
  */
}
