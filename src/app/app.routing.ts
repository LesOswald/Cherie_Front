import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import User
import { UserEditComponent } from './components/user-edit.component';
// Import Marca
import { MarcaListComponent } from './components/marca-list.component';

const appRoutes: Routes = [
    {path: '', component: MarcaListComponent},
    {path: 'marcas/:page', component: MarcaListComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: MarcaListComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
