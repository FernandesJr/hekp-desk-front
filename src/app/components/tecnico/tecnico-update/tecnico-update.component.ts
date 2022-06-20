import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/Tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  //senha2 = new UntypedFormControl(null, Validators.minLength(3));

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email:  '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.paramMap.get("id"));
  }

  findById(id: any) {
    this.service.findById(id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.perfis = [];
      this.tecnico.dataCriacao = null;
      console.log(this.tecnico);
    });
  }

  update() {
    console.log(this.tecnico)
    this.service.update(this.tecnico).subscribe(() => {
      this.toastr.success("Usuário atualizado com sucesso.", "Update");
      this.router.navigate(["tecnicos"]);
    }, ex => {
      if(ex.error.error) {
        this.toastr.error(ex.error.message);
      }else {
        this.toastr.error(ex.error.errors[0].message);
      }
      console.log(ex);
    });
  }

  addPerfil(perfil: any) {
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validar(): boolean {
    return this.nome.valid && this.cpf.valid && 
      this.email.valid && this.senha.valid ;
  }

}
