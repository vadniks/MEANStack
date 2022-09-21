import { Component, Input } from '@angular/core'
import { Contact } from '../contact/contact'
import { ContactService } from '../contact/contact.service'
import { ContactListComponent } from '../contact-list/contact-list.component'

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
    @Input() contact: Contact | null = null
    @Input() delegate: ContactListComponent | null = null

    constructor(private readonly service: ContactService) {}

    create(): void { if (!this.contact) throw 1; else this.service.create(this.contact).subscribe(
        $new => this.delegate?.add($new)
    ) }

    update(): void { if (!this.contact) throw 1; else this.service.update(this.contact).subscribe(
        updated => this.delegate?.update(updated)
    ) }

    delete(): void { if (this.contact && this.contact._id) this.service.delete(this.contact._id).subscribe(
        $id => this.delegate?.delete($id)
    ); else throw 1 }
}
