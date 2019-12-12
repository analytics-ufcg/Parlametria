import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from '@ag-grid-community/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdSortableHeaderDirective } from '../shared/directives/sortable.directive';
import { RelatoriosListarComponent } from './relatorios-listar/relatorios-listar.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SociosEmpresasCampanhaComponent } from './socios-empresas-campanha/socios-empresas-campanha.component';
import { RuralistasAmbientalistasComponent } from './ruralistas-ambientalistas/ruralistas-ambientalistas.component';

@NgModule({
  declarations: [
    NgbdSortableHeaderDirective,
    RelatoriosListarComponent,
    SociosEmpresasCampanhaComponent,
    RuralistasAmbientalistasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgbModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
