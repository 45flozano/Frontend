import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleados } from '../../models/empleados';
declare var M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  constructor(public empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  addEmpleado(empleadoForm: NgForm) {
    if (empleadoForm.value._id) {
      //Actualizamos
      this.empleadosService.putEmpleado(empleadoForm.value).subscribe(
        (res) => {
          console.log(res);
          M.toast({ html: 'Empleado Actualizado Correctamente' });
          this.getEmpleados();
        },
        (err) => {
          M.toast({ html: 'Error al actualizar el empleado' });
        }
      );
    } else {
      console.log(empleadoForm.value);
      //Guardarlos en la base de datos
      this.empleadosService.addEmpleado(empleadoForm.value).subscribe(
        (res) => {
          console.log(res);
          M.toast({ html: 'Empleado Guardado Correctamente' });
          this.resetForm();
          this.getEmpleados();
        },
        (err) => {
          console.log(err);
          M.toast({ html: 'Empleado No guardado' });
        }
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.empleadosService.empleado = new Empleados();
  }

  getEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (res) => {
        console.log(res);
        this.empleadosService.empleados = res as Empleados[];
      },
      (err) => {
        M.toast({ html: 'Error al obtener empleados' });
      }
    );
  }

  editarEmpleado(empleado: Empleados) {
    //Asociamos los datos del empleado  con el modelo de datos para asignarlos al formulario
    this.empleadosService.empleado = empleado;
  }

  eliminarEmpleado(_id: String) {
    if (confirm('¿Estas seguro de eliminar al empleado?')) {
      this.empleadosService.deleteEmpleado(_id).subscribe(
        (res) => {
          M.toast({ html: 'Empleado Borrado Exitosamente' });
          this.getEmpleados();
        },
        (err) => {
          M.toast({ html: 'Error al al borrar el empleado' });
        }
      );
    }
  }
}
