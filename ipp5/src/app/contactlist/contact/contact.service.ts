import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Contact } from './contact'

@Injectable({providedIn: 'root'})
export class ContactService {
    private readonly apiUrl = 'http://localhost:8080/contacts' // Patched (replaced with the real url) by server

    constructor(private readonly http: HttpClient) {}

    getAll(): Observable<Contact[] | null> { return this.http.get<Contact[]>(this.apiUrl) }

    create(contact: Contact): Observable<Contact | null>
    { return this.http.post<Contact>(this.apiUrl, contact) }

    update(contact: Contact): Observable<Contact | null>
    { return this.http.put<Contact>(this.apiUrl + '/' + contact._id, contact) }

    delete(id: string): Observable<string> { return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text' }) }
}
