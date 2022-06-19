import { ActivatedRoute } from '@angular/router';
import { ChamadoService } from './../../../services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    titulo: '',
    status: '',
    prioridade: '',
    cliente: '',
    tecnico: '',
    nomeCliente: '',
    nomeTecnico: '',
    dataAbertura: '',
    dataFechamento: '',
    observacoes: ''
  }

  constructor(
    private chamadoService: ChamadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.paramMap.get("id")); //Busca o id da URI
  }

  findById(id: any): void {
    this.chamadoService.findById(id).subscribe(resposta => {
      this.chamado = resposta;
    });
  }

  prioridadeDesc(cod: any): string {
    if(cod == "0"){
      return "BAIXA";
    } else if(cod == "1"){
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  statusDesc(cod: any): string {
    if(cod == "0"){
      return "ABERTO";
    } else if(cod == "1"){
      return "EM ANDAMENTO";
    } else {
      return "FECHADO";
    }
  }

}
