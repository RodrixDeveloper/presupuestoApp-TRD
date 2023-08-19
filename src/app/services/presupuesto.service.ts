import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  private gastos$ = new Subject<any>();


  private gastosKey = 'listaGastos';
  private presupuestoKey = 'presupuesto';
  private restanteKey = 'restante';


  constructor() {
    this.presupuesto = this.obtenerPresupuestoDesdeLocalStorage();
    this.restante= this.obtenerRestanteDesdeLocalStorage();
  }

  agregarGasto(gasto:any){
    this.restante = this.restante - gasto.cantidad;
    this.gastos$.next(gasto);
  }

  getGastos():Observable<any>{
    return this.gastos$.asObservable();
  }

  guardarGastosEnLocalStorage(gastos: any[]) {
    localStorage.setItem(this.gastosKey, JSON.stringify(gastos));
  }

  obtenerGastosDesdeLocalStorage(): any[] {
    const gastosString = localStorage.getItem(this.gastosKey);
    return gastosString ? JSON.parse(gastosString) : [];
  }

  guardarPresupuestoEnLocalStorage(presupuesto: number) {
    localStorage.setItem(this.presupuestoKey, JSON.stringify(presupuesto));
  }

  obtenerPresupuestoDesdeLocalStorage(): number {
    const presupuestoString = localStorage.getItem(this.presupuestoKey);
    return presupuestoString ? JSON.parse(presupuestoString) : 0;
  }

  guardarRestanteEnLocalStorage(restante: number) {
    localStorage.setItem(this.restanteKey, JSON.stringify(restante));
  }

  obtenerRestanteDesdeLocalStorage(): number {
    const restanteString = localStorage.getItem(this.restanteKey);
    return restanteString ? JSON.parse(restanteString) : 0;
  }


  eliminarPresupuestoDeLocalStorage() {
    localStorage.removeItem(this.gastosKey);
    localStorage.removeItem(this.presupuestoKey);
    localStorage.removeItem(this.restanteKey);
  }
}
