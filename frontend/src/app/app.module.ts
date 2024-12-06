import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule for form handling
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateBidComponent } from './pages/create-bid/create-bid.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ViewAuctionsComponent } from './pages/view-auctions/view-auctions.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyBidsComponent } from './pages/my-bids/my-bids.component';
import { EditBidComponent } from './pages/edit-bid/edit-bid.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateBidComponent,
    ForgotPasswordComponent,
    ViewAuctionsComponent,
    ResetPasswordComponent,
    SignupComponent,
    MyBidsComponent,
    EditBidComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // Form handling module
    HttpClientModule,  // Ensure HttpClientModule is imported
    FormsModule  // Import FormsModule for template-driven forms
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },  // Correct use of HTTP_INTERCEPTORS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
