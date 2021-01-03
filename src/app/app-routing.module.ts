import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component'; // new-customer
import { CustomerComponent } from './components/customer/customer.component'; // customer-details
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
{ path: '', redirectTo: 'customers', pathMatch: 'full' },
{ path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
{ path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]  },
{ path: 'customers/add', component: AddCustomerComponent, canActivate: [AuthGuard] },
{ path: 'customer/:id', component: CustomerComponent, canActivate: [AuthGuard] },
{ path: 'customer/:id/edit', component: EditCustomerComponent, canActivate: [AuthGuard] },
{ path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
