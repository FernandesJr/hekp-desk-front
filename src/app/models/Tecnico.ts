export interface Tecnico {
    id ?: any; //a interrogação informa que pode ou não ter o atributo
    email : string;
    senha : string;
    nome : string;
    cpf: string;
    perfis : string[];
}