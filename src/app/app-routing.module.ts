import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {SingleSweetComponent} from './pages/single-sweet/single-sweet.component';
import {AuthGuardService} from './services/auth-guard.service';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin/dashboard', canActivate: [AuthGuardService], component: AdminDashboardComponent },
  { path: 'login', component: SigninComponent},
  { path: 'sweet/:id', component: SingleSweetComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
