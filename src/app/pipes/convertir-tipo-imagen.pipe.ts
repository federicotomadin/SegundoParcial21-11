import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirTipoImagen'
})
export class ConvertirTipoImagenPipe implements PipeTransform {

  transform(value: any, tipo: any): any {
    return tipo;
  }

}
