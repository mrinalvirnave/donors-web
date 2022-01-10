import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { AddDonorComponent } from './add-donor/add-donor.component';
import { LoginComponent } from './login/login.component';
import { LoginActivateGuard } from './login-activate.guard'


const routes: Routes = [
  { path: '', redirectTo: 'donors', pathMatch: 'full' },
  { path: 'donors', component: DonorsListComponent, canActivate:[LoginActivateGuard] },
  { path: 'donors/:id', component: DonorDetailComponent, canActivate:[LoginActivateGuard] },
  { path: 'add', component: AddDonorComponent, canActivate:[LoginActivateGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
