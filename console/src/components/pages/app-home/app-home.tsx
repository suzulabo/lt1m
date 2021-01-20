import { Component, h, Host, Prop } from '@stencil/core';
import { App } from 'src/app/app';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {
  @Prop()
  app: App;

  private handleSingoutClick = () => {
    void this.app.auth.signOut();
  };

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>{this.app.msgs.home.title}</ion-title>
            <ion-buttons slot="end">
              <ion-button slot="end" onClick={this.handleSingoutClick}>
                {this.app.msgs.home.signOut}
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>WIP</ion-content>
      </Host>
    );
  }
}
