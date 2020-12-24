import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonalPageComponent } from './pages/personal/personal-page/personal-page.component';
import { UserInfoComponent } from './pages/personal/components/user-info/user-info.component';
import { UserOrdersComponent } from './pages/personal/components/user-orders/user-orders.component';
import { HeaderComponent } from './global-components/header/header.component';
import { OutputOrdersComponent } from './pages/personal/components/output-orders/output-orders.component';
import { UsersComponent } from './pages/users-list/list/users/users.component';
import { AdminPageComponent } from './pages/admin/admin-page/admin-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ProcessOrdersComponent } from './pages/personal/components/process-orders/process-orders.component';
import { ReturnedOrdersComponent } from './pages/personal/components/returned-orders/returned-orders.component';
import { OpenedCustomerOrdersComponent } from './pages/personal/components/opened-customer-orders/opened-customer-orders.component';
import { OrdersToApproveComponent } from './pages/personal/components/orders-to-approve/orders-to-approve.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PersonalPageComponent,
    UserInfoComponent,
    UserOrdersComponent,
    HeaderComponent,
    OutputOrdersComponent,
    UsersComponent,
    AdminPageComponent,
    ProcessOrdersComponent,
    ReturnedOrdersComponent,
    OpenedCustomerOrdersComponent,
    OrdersToApproveComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
