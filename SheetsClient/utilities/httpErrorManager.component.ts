import {Component, Input} from 'angular2/core';
import {Response} from 'angular2/http';

@Component({
    selector: 'httpErrorManager',
	providers: [],
    template: `
        <div id="errorMessage" [hidden]="!httpErrorResponse" class="httpAlert httpAlert-danger">
            {{errorMessage}}
            <span (click)="toggleShowDetails()" style="text-decoration: underline; color: #1BA2DC; cursor: pointer;">{{getToggleText()}}</span>
        </div>
        <div id="errorMessageDetails" [hidden]="!showDetails" class="httpAlert httpAlert-danger">
            {{getDetails()}}
            <span (click)="toggleShowDetails()" style="text-decoration: underline; color: #1BA2DC; cursor: pointer;">{{getToggleText()}}</span>
        </div>
    `, 
	styleUrls: ['../styles/errorManager.css'],
})
export class HttpErrorManagerComponent {
    @Input() errorMessage = 'We are noticing issues in the communication with the Server. We r working hard to solve them asap. We appreciate your patience.';
    //@Input() httpErrorResponse: Response;
    @Input() httpErrorResponse: string;
    
    public showDetails = false;
    
    toggleShowDetails() {
        this.showDetails = !this.showDetails;
    }
    
    getToggleText() {
        let toggleText;
        if (this.showDetails) {
            toggleText = 'Hide details';
        } else {
            toggleText = 'Show some nitty gritty details';
        }
        return toggleText;
    }
    
    getDetails() {
        let details = '';
        if (this.httpErrorResponse) {
            //details = this.httpErrorResponse.text();
            details = this.httpErrorResponse;
        }
        return details;
    }
}