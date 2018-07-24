import { Component } from '@angular/core';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  constructor(
    private messageService: MessageService
  ) { 

  }

  close() {
    console.log('close popup');
  }
}
