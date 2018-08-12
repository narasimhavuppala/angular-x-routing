import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss']
})
export class TipsComponent {

    @Input() position = 'left';
    isVisible = false;

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

}
