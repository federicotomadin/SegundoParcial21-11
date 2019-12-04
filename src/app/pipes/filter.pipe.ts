import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoTipo = [];
    for (const item of value) {
      if (item.tipo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
       resultadoTipo.push(item);
      }

    }
    return resultadoTipo;
  }

}
