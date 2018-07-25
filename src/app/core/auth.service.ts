import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from 'app/user/user.model';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

    private userSource = new BehaviorSubject<UserModel>(null);
    user$ = this.userSource.asObservable();

    currentUser: UserModel;
    redirectUrl: string;

    constructor(
        private router: Router,
        private messageService: MessageService
    ) { }

    // This was called from template in app.component, but we use emit emitter instead, for perfomance(?)
    // But we need it now for our auth-guard.service
    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        if (!userName || !password) {
            this.messageService.addMessage('Please enter your userName and password');
            return;
        }
        if (userName === 'admin') {
            this.currentUser = {
                id: 1,
                userName: userName,
                isAdmin: true
            };

            this.communicateLoggedIn('Admin login');
            return;
        }
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };

        this.communicateLoggedIn(`User: ${this.currentUser.userName} logged in`);
    }

    logout(): void {
        this.currentUser = null;
        this.userSource.next(this.currentUser);

        // This "resets" the route (pass in string) (like clearing (popup:message)), https://angular.io/api/router/Router#navigateByUrl
        this.router.navigateByUrl('welcome');
    }

    private communicateLoggedIn(message: string) {
        this.messageService.addMessage(message);
        this.userSource.next(this.currentUser);
        
        // Could use shorthand syntax (just like in directive) this.router.navigate('products')
        // Instead of always redirect to /products after login, we instead redirect to the url the user wanted to reach, the property redirectUrl is set in the auth-guard.service
        // this.router.navigate(['/products']);
        
        if(this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
        } else {
            this.router.navigate(['/products']);
        }
    }
}
