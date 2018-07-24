import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {

  }

  close() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
}
