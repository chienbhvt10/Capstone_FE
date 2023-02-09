import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T, any>;
  onFinish?: (values: T) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
  BoxProps?: Partial<BoxProps>;
  grid?: boolean;
}

const Form = <T extends FieldValues>(props: PropsWithChildren<Props<T>>) => {
  const { children, form, BoxProps = {}, onFinish, onError, ...rest } = props;

  return (
    <FormProvider {...form}>
      <Box
        noValidate
        component="form"
        onSubmit={onFinish ? form.handleSubmit(onFinish, onError) : void 0}
        {...BoxProps}
        {...rest}
      >
        {children}
      </Box>
    </FormProvider>
  );
};

export default Form;
