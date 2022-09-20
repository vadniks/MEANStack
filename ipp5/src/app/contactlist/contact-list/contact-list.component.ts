import { Component, OnInit } from '@angular/core'
import { Contact } from '../contact/contact'
import { ContactService } from '../contact/contact.service'

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = Array<Contact>()
    selected: Contact | null = null

    constructor(private readonly service: ContactService) {}

    ngOnInit(): void { this.service.getAll().subscribe(
        contacts => { if (contacts) this.contacts = contacts }
    ) }

    private index(id: string): number
    { return this.contacts.findIndex(contact => contact._id === id) }

    create(): void { this.selected = {
        username: '',
        email: '',
        telephone: {
            mobile: '',
            home: ''
        }
    } }

    add(delegate: ContactListComponent, contact: Contact | null): void {
        if (!contact) throw 1
        delegate.contacts.push(contact)
        delegate.selected = contact
    }

    update(delegate: ContactListComponent, contact: Contact | null): void {
        if (!contact || !contact._id) throw 1

        const idx = delegate.index(contact._id)
        if (idx === -1) return

        delegate.contacts[idx] = contact
        delegate.selected = contact
    }

    delete(delegate: ContactListComponent, id: string | null): void {
        if (!id) throw 1
        const idx = delegate.index(id)
        if (idx === -1) return
        delegate.contacts.splice(idx, 1)
        delegate.selected = null
    }
}
