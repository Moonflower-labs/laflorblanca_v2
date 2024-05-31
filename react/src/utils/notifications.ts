import { toast, ToastOptions, ToastPromiseParams } from "react-toastify";

export const notify = (message: string, options?: ToastOptions) => {
  toast(message, options);
};
export const notifyPromise = (
  promise: Promise<unknown>,
  { pending, success, error }: ToastPromiseParams,
  options?: ToastOptions
) => {
  toast.promise(promise, {
    pending: pending,
    success: success,
    error: error,
    ...options,
  });
};
