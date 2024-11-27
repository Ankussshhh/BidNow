import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateBidComponent } from './pages/create-bid/create-bid.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { ViewAuctionsComponent } from './pages/view-auctions/view-auctions.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { SignupComponent } from './pages/signup/signup.component'


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'auctions', component: ViewAuctionsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'create-bid', component: CreateBidComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
