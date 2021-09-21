import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Importar el modelo de datos
import { Empleados } from '../models/empleados';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  readonly url = 'http://localhost:3000/api/empleados';
  empleado: Empleados; //Intercambiar datos del formulario
  empleados: Empleados[]; //Para almacenar todos los empleados
  constructor(private httpClient: HttpClient) {
    this.empleado = new Empleados();
    this.empleados = new Array();
  }

  //Obtenemos todos los empleados de la base de datos
  getEmpleados() {
    return this.httpClient.get(this.url);
  }
  addEmpleado(empleado: Empleados) {
    return this.httpClient.post(this.url, empleado);
  }
  putEmpleado(empleado: Empleados) {
    return this.httpClient.put(this.url + '/' + empleado._id, empleado);
  }
  deleteEmpleado(_id: String) {
    return this.httpClient.delete(this.url + '/' + _id);
  }
}
