import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from './../../../services/chamado.service';
import { Cliente } from './../../../models/cliente';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastr.success("Chamado cadastrado com sucesso.", "Chamado");
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

}
