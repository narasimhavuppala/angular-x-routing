import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
    {
        // This will be activated in <router-outlet> named popup in app.component.html
        // /xxx(popup:messages)
        path: 'messages',
        component: MessagesComponent,
        outlet: 'popup'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MessagesRoutingModule { }
