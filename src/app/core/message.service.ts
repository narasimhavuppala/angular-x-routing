import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    messages: string[] = [];
    isDisplayed = false;

    addMessage(message: string) {
        const currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    }
}
