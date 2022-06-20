import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from './../../../services/chamado.service';
import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from 'src/app/models/chamado';
import { Tecnico } from 'src/app/models/Tecnico';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-chamado-upgrade',
  templateUrl: './chamado-upgrade.component.html',
  styleUrls: ['./chamado-upgrade.component.css']
})
export class ChamadoUpgradeComponent implements OnInit {

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

  titulo: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });

    this.findById(this.route.snapshot.paramMap.get("id")); //Busca o id da URI
  }

  findById(id: any): void {
    this.chamadoService.findById(id).subscribe(resposta => {
      this.chamado = resposta;
    });
  }

  upgrade(): void {
    this.chamadoService.upgrade(this.chamado).subscribe(resposta => {
      this.toastr.success("Chamado atualizado com sucesso.", "Chamado");
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastr.error(ex.error.error, "Erro");
      console.log(ex);
    });
  }

  validaCampo(): boolean {
    return this.titulo.valid && this.status.valid && 
      this.prioridade.valid && this.tecnico.valid && 
      this.cliente.valid && this.observacoes.valid;
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