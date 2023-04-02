export interface FiltersRef<T = any> {
  reset: () => void;
  submit: (values: T) => void;
}
