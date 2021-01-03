import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

pageTitle: string = 'Contacts';
headerIcon: string = 'fas fa-users'; 

  contacts: Contact[]=[];

  constructor(private titeService: Title, private contactsServices: ContactsService) { }

  ngOnInit(): void {

    this.contactsServices.getContacts().subscribe((contacts: Contact[] ) => {
      this.contacts = contacts;
     });  
    this.titeService.setTitle('Company CRM | Contacts');
  }

}
