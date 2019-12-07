import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, tipo: any): any {
    const resultadoTipo = [];
    for (const item of value) {
      if (item.tipo.toLowerCase().indexOf(tipo.toLowerCase()) > -1 ||
      item.concesionaria.toLowerCase().indexOf(tipo.toLowerCase()) > -1) {
       resultadoTipo.push(item);
      }
    }
    return resultadoTipo;
  }

}
