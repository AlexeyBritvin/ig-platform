import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './form/create/create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ig' },
  {
    path: 'ig',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'create' },
      { path: 'create', component: CreateComponent },
      { path: ':id', component: CreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
