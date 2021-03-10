import { ProviderComponent } from './components/modules/provider/provider.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './components/modules/assets/assets.component';
import { HomeComponent } from './components/modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: 'providers',
    component: ProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
