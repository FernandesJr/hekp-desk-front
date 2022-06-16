import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      titulo: "primeiro chamado",
      dataAbertura: "16/06/2022 10:00:00",
      dataFechamento: "16/06/2022 11:38:15",
      cliente: 4,
      tecnico: 11,
      nomeCliente: "Tereza de Jesus",
      nomeTecnico: "Fernandes Jr.",
      prioridade: "alta",
      status: "fechado",
      observacoes: ""
    }
  ];
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'acoes'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
