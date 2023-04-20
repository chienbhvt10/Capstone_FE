import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import type { ElementType, HTMLAttributes, PropsWithChildren } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T, any>;
  paper?: boolean;
  PaperProps?: Partial<PaperProps>;
  BoxProps?: Partial<BoxProps>;
  onFinish?: (values: T) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
  grid?: boolean;
}

const ReactHookForm = <T extends FieldValues>(
  props: PropsWithChildren<Props<T>>
) => {
  const {
    children,
    form,
    paper,
    BoxProps = {},
    onFinish,
    onError,
    grid,
    PaperProps = {
      sx: {
        ...(paper && {
          p: 2,
        }),
        ...(grid && {
          p: 2,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 2.5,
        }),
      },
    },
    ...rest
  } = props;

  const Component: ElementType = paper ? Paper : Box;

  return (
    <FormProvider {...form}>
      <Component
        noValidate
        component="form"
        onSubmit={onFinish ? form.handleSubmit(onFinish, onError) : void 0}
        {...PaperProps}
        {...BoxProps}
        {...rest}
      >
        {children}
      </Component>
    </FormProvider>
  );
};

export default ReactHookForm;
