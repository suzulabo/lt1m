import { Component, h, Prop } from '@stencil/core';
import { App } from 'src/app/app';

@Component({
  tag: 'app-signin',
  styleUrl: 'app-signin.scss',
})
export class AppSignIn {
  @Prop()
  app: App;

  private handleGoogleClick = () => {
    this.app.auth.signIn.google();
  };

  render() {
    return (
      <ion-content>
        <div class="main">
          <ion-button
            class="google-btn"
            expand="block"
            fill="outline"
            onClick={this.handleGoogleClick}
          >
            <ion-icon slot="start" src="/assets/google-icon.svg"></ion-icon>
            {this.app.msgs.signIn.social.google}
          </ion-button>
        </div>
      </ion-content>
    );
  }
}
