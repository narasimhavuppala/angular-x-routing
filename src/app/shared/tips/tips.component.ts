import { Component } from '@angular/core';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss']
})
export class TipsComponent {

    isVisible = false;

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

}
