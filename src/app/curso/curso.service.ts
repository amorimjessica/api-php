import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = "http://localhost/api/php/";

  //Vetor
  vetor: Curso[] = [];

  constructor(private http:HttpClient) { }

  //Obter todos os cursos
  obterCursos():Observable<Curso[]> {
    return this.http.get(this.url+"listar").pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      }) 
    )
  }


  //Cadastrar curso
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar', {cursos:c})
    .pipe(map((res) => {
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))
  }

  //Remover curso
  removerCurso(c: Curso): Observable<Curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso?.toString());

    return this.http.delete(this.url+'excluir'{params: params})
    .pipe(map((res) => {

      const filtro = this.vetor.filter((Curso) => {
        return +Curso['idCurso'] !== +c.idCurso;
      });

      return this.vetor = filtro;

    }))

  }

  //Atualizar curso
  atualizarCurso(c:Curso): Observable<Curso[]>{

    //Executa a alteração
    return.this.http.put(this.url+'alterar', {cursos:c})

    //Percorre o vetor para saber qual é o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item) => {
        return +item['idCurso'] === +[];
      });

      //Altero o valor do vetor local
      if(cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }

      return this.vetor;
    }))
  }

}
