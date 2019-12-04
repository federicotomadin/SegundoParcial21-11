import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concesionaria'
})
export class ConcesionariaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoTipo = [];
    for (const item of value) {
      if (item.concesionaria.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
       resultadoTipo.push(item);
      }

    }
    return resultadoTipo;
  }
  }
