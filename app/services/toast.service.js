// app/services/toast.service.js

import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export const toastService = {
  onToast,
  success,
  error,
  info,
  warn,
  alert: toast,
  clear,
};

export const ToastType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

const toastSubject = new Subject();
const defaultId = "default-toast";

// habilitar la suscripción a los observables de toast
function onToast(id = defaultId) {
  return toastSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// métodos de conveniencia
function success(message, options) {
  toast({ ...options, type: ToastType.Success, message });
}

function error(message, options) {
  toast({ ...options, type: ToastType.Error, message });
}

function info(message, options) {
  toast({ ...options, type: ToastType.Info, message });
}

function warn(message, options) {
  toast({ ...options, type: ToastType.Warning, message });
}

// metodo core de alert
function toast(toast) {
  toast.id = toast.id || defaultId;
  toast.autoClose = toast.autoClose === undefined ? true : toast.autoClose;
  toastSubject.next(toast);
}

// limpiar alerts
function clear(id = defaultId) {
  toastSubject.next({ id });
}