import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css'],
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  presupuesto: number;
  restante: number;
  listGasto: any[] = [];

  constructor(private _presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._presupuestoService
      .getGastos()
      .subscribe((data) => {
        this.restante = this.restante - data.cantidad;
        this.listGasto.push(data);
        console.log(this.listGasto);
        this._presupuestoService.guardarRestanteEnLocalStorage(this.restante); // Guardar el presupuesto en Local Storage
        this._presupuestoService.guardarGastosEnLocalStorage(this.listGasto);
      });
  }

  agregarGasto(gasto: any) {}

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;

    this.listGasto = this._presupuestoService.obtenerGastosDesdeLocalStorage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante() {
    if (this.presupuesto / 4 > this.restante) {
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-secondary';
    }
  }

  // eliminarGasto(index: number) {
  //   if (index >= 0 && index < this.listGasto.length) {
  //     const gastoEliminado = this.listGasto.splice(index, 1); // Elimina 1 elemento en el índice especificado
  //     this.restante += gastoEliminado[0].cantidad; // Añade la cantidad eliminada al restante
  //     this._presupuestoService.guardarRestanteEnLocalStorage(this.restante); // Actualiza el restante en Local Storage
  //     this._presupuestoService.guardarGastosEnLocalStorage(this.listGasto); // Actualiza la lista de gastos en Local Storage
  //     // this.listGasto = this._presupuestoService.obtenerGastosDesdeLocalStorage();

  //   }
  // }
  
  eliminarGasto(index: number) {
    if (index >= 0 && index < this.listGasto.length) {
      const gastoEliminado = this.listGasto.splice(index, 1);
      this.restante += gastoEliminado[0].cantidad;

      // Actualizar el restante en el servicio y en Local Storage
      this._presupuestoService.guardarRestanteEnLocalStorage(this.restante);
      this._presupuestoService.restante = this.restante;
      this._presupuestoService.guardarGastosEnLocalStorage(this.listGasto);
    }
  }
}
