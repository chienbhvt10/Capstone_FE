import type { AnySchema, ObjectShape, ValidationError } from 'yup';
import { array, date, mixed, number, object, setLocale, string } from 'yup';
import Regexs from './Regexs';

class Validation {
  public mixed() {
    return mixed();
  }

  public array() {
    return array();
  }

  public resolver(error: ValidationError) {
    return error.message;
  }

  public validate(validate?: AnySchema) {
    return async (value: any) => {
      if (!validate) return true;

      const message = await validate
        .validate(value)
        .then(() => void 0)
        .catch(this.resolver);

      return message;
    };
  }

  public shape<T extends ObjectShape>(
    additions: T,
    excludes?: [string, string][]
  ) {
    return object().shape<T>(additions, excludes);
  }

  public string() {
    return string().ensure().required().max(255).trim().default('');
  }

  public number() {
    return number();
  }

  public option() {
    return number().required().nullable().default(null);
  }

  public select(value: number) {
    return number().required().default(value);
  }

  public date() {
    return date()
      .required()
      .typeError('schema.invalidDate')
      .nullable()
      .default(null);
  }

  public email() {
    return string()
      .trim()
      .required()
      .matches(Regexs.email, 'schema.validEmail')
      .max(255)
      .default('');
  }

  public phone() {
    return string()
      .trim()
      .required()
      .matches(Regexs.phone, 'schema.validPhone')
      .max(255)
      .default('');
  }

  public description() {
    return string().trim().max(5000).default('');
  }

  public pattern(regexp: RegExp, message?: string) {
    return this.string().matches(regexp, message);
  }
}

export default new Validation();
