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

    index(id: string): number
    { return this.contacts.findIndex(contact => contact._id === id) }

    create(): void { this.selected = {
        username: '',
        email: '',
        telephone: {
            mobile: '',
            home: ''
        }
    } }

    add(contact: Contact | null): void {
        if (!contact) throw 1
        this.contacts.push(contact)
        this.selected = contact
    }

    update(contact: Contact | null): void {
        if (!contact || !contact._id) throw 1

        const idx = this.index(contact._id)
        if (idx === -1) return

        this.contacts[idx] = contact
        this.selected = contact
    }

    delete(id: string | null): void {
        if (!id) throw 1

        const idx = this.index(id)
        if (idx === -1) return

        this.contacts.splice(idx, 1)
        this.selected = null
    }
}
