import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ContactDetailsComponent } from './contactlist/contact-details/contact-details.component'
import { ContactListComponent } from './contactlist/contact-list/contact-list.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        AppComponent,
        ContactDetailsComponent,
        ContactListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
