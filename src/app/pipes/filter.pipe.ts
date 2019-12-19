import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, tipo: any): any {
    const resultadoTipo = [];
    for (const item of value) {

      console.log(item.horarioEntrada);
      console.log(item.horarioSalida);

  
    }
    return resultadoTipo;
  }

}
