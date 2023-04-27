import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  Dialog,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  FormControlLabel,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  Fragment,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { boolean } from 'yup';
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import { SOLVER, STRATEGY } from '~/constants';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import useNotification from '~/hooks/useNotification';
import { executeArrange } from '~/services/arrange';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';

interface SettingForm {
  solver: number;
  strategy: number;
  maxSearchingTime: number;
  O01_Level: number;
  O02_Level: number;
  O03_Level: number;
  O04_Level: number;
  O05_Level: number;
  O06_Level: number;
  O07_Level: number;
  O08_Level: number;
  O01_Activated: boolean;
  O02_Activated: boolean;
  O03_Activated: boolean;
  O04_Activated: boolean;
  O05_Activated: boolean;
  O06_Activated: boolean;
  O07_Activated: boolean;
  O08_Activated: boolean;
}
const schema = Validation.shape({
  solver: Validation.number()
    .default(0)
    .typeError('Please input a number')
    .required('Solver is required'),
  strategy: Validation.number()
    .default(0)
    .typeError('Please input a number')
    .required('Strategy is required'),
  maxSearchingTime: Validation.number()
    .typeError('Please input a number')
    .default(0)
    .required('MaxSearchingTime is required'),
  O01_Level: Validation.number().typeError('Please input a number').default(0),
  O02_Level: Validation.number().typeError('Please input a number').default(0),
  O03_Level: Validation.number().typeError('Please input a number').default(0),
  O04_Level: Validation.number().typeError('Please input a number').default(0),
  O05_Level: Validation.number().typeError('Please input a number').default(0),
  O06_Level: Validation.number().typeError('Please input a number').default(0),
  O07_Level: Validation.number().typeError('Please input a number').default(0),
  O08_Level: Validation.number().typeError('Please input a number').default(0),
  O01_Activated: boolean().default(false),
  O02_Activated: boolean().default(false),
  O03_Activated: boolean().default(false),
  O04_Activated: boolean().default(false),
  O05_Activated: boolean().default(false),
  O06_Activated: boolean().default(false),
  O07_Activated: boolean().default(false),
  O08_Activated: boolean().default(false),
});

interface Props {
  openDialog: boolean;
  onCloseDialog: () => void;
}

const SettingModelDialog = forwardRef<FiltersRef, Props>((props, ref) => {
  const { openDialog, onCloseDialog: onClose } = props;
  const { refetch, refetchClass, refetchRoom, refetchListExecuteInfo } =
    useArrange();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<SettingForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const [loadingExecuted, setLoadingExecuted] = useState<boolean>(false);
  const [isFastArrange, setFastArrange] = useState<boolean>(false);
  const [isGoodResult, setGoodResult] = useState<boolean>(false);

  const setNotification = useNotification();

  const onSubmit = (value: SettingForm) => {
    console.log(value);
    if (
      value.solver === 0 ||
      value.strategy === 0 ||
      value.maxSearchingTime === 0
    ) {
      setNotification({
        message: 'All of solver, strategy, and max searching time is required',
        severity: 'error',
      });
      return;
    }
    setLoadingExecuted(true);
    executeArrange({
      departmentHeadId: user?.id || 0,
      maxSearchingTime: value.maxSearchingTime,
      objectiveOption: [
        value.O01_Activated ? 1 : 0,
        value.O02_Activated ? 1 : 0,
        value.O03_Activated ? 1 : 0,
        value.O04_Activated ? 1 : 0,
        value.O05_Activated ? 1 : 0,
        value.O06_Activated ? 1 : 0,
        value.O07_Activated ? 1 : 0,
        value.O08_Activated ? 1 : 0,
      ],
      objectiveWeight: [
        value.O01_Level,
        value.O02_Level,
        value.O03_Level,
        value.O04_Level,
        value.O05_Level,
        value.O06_Level,
        value.O07_Level,
        value.O08_Level,
      ],
      solver: value.solver,
      strategy: value.strategy,
    })
      .then((res) => {
        if (res.isSuccess) {
          refetch();
          refetchClass();
          refetchRoom();
          refetchListExecuteInfo();
          setNotification({
            message: 'Execute Arrange success',
            severity: 'success',
          });
          onClose();
        } else {
          setNotification({
            message: res.message,
            severity: 'error',
          });
        }
      })
      .catch((err) =>
        setNotification({
          message: 'Execute Arrange error',
          severity: 'error',
        })
      )
      .finally(() => {
        setLoadingExecuted(false);
      });
  };

  const handleReset = () => {
    reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: handleSubmit(onSubmit),
  }));

  const onChangeFastArrange = (event: ChangeEvent<HTMLInputElement>) => {
    setFastArrange(event.target.checked);
    if (event.target.checked) {
      setGoodResult(false);
      reset({
        ...schema.getDefault(),
        maxSearchingTime: 60,
        solver: 1,
        strategy: 2,
      });
    }
  };

  const onChangeGoodResult = (event: ChangeEvent<HTMLInputElement>) => {
    setGoodResult(event.target.checked);
    if (event.target.checked) {
      setFastArrange(false);
      reset({
        ...schema.getDefault(),
        maxSearchingTime: 600,
        solver: 1,
        strategy: 2,
        O01_Level: 50,
        O01_Activated: true,
        O02_Level: 25,
        O02_Activated: true,
      });
    }
  };

  return (
    <Dialog maxWidth="md" open={openDialog} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Setting Before Execute
            </Typography>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                Max Searching Time
                <Typography component="span" sx={{ color: 'error.main' }}>
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('maxSearchingTime')}
                name="maxSearchingTime"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.maxSearchingTime?.message &&
                  `*${errors.maxSearchingTime?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={2}>
                <Stack direction="row">
                  <Checkbox
                    name="isFastArrange"
                    checked={isFastArrange}
                    onChange={onChangeFastArrange}
                  />
                  <FormLabel
                    htmlFor="isFastArrange"
                    sx={{
                      color: 'warning.main',
                    }}
                  >
                    Fast arrange
                  </FormLabel>
                </Stack>
                <Stack direction="row">
                  <Checkbox
                    name="isGoodResult"
                    checked={isGoodResult}
                    onChange={onChangeGoodResult}
                  />
                  <FormLabel
                    htmlFor="isGoodResult"
                    sx={{
                      color: 'success.main',
                    }}
                  >
                    Good result
                  </FormLabel>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Select optimization model
                <Typography component="span" sx={{ color: 'error.main' }}>
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="solver"
                control={control}
                render={({ field }) => (
                  <Fragment>
                    <Select {...field} sx={{ maxWidth: 350, width: 1 }}>
                      <MenuItem disabled value={0}>
                        <em>Select Solver</em>
                      </MenuItem>
                      <MenuItem value={SOLVER.ORTOOL}>OR-Tools</MenuItem>
                      <MenuItem value={SOLVER.CPLEX}>CPLEX</MenuItem>
                      <MenuItem value={SOLVER.NGSAII}>NGSA-II</MenuItem>
                    </Select>
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {errors.solver?.message && `*${errors.solver?.message}`}
                    </Typography>
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="strategy"
                control={control}
                render={({ field }) => (
                  <Fragment>
                    <Select {...field} sx={{ maxWidth: 350, width: 1 }}>
                      <MenuItem disabled value={0}>
                        <em>Select Strategy</em>
                      </MenuItem>
                      <MenuItem value={STRATEGY.SCALARIZATION}>
                        Scalarization
                      </MenuItem>
                      <MenuItem value={STRATEGY.CONSTRAINT_PROGRAMMING}>
                        Constraint Programming
                      </MenuItem>
                      <MenuItem value={STRATEGY.COMPROMISED_PROGRAMMING}>
                        Compromised Programming
                      </MenuItem>
                      <MenuItem value={STRATEGY.PARETO_BASED}>
                        Pareto based
                      </MenuItem>
                    </Select>
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {errors.strategy?.message &&
                        `*${errors.strategy?.message}`}
                    </Typography>
                  </Fragment>
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-01: Minimize working day
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O01_Level')}
                name="O01_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O01_Level?.message && `*${errors.O01_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O01_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>{' '}
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-02: Minimize day's session working{' '}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O02_Level')}
                name="O02_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O02_Level?.message && `*${errors.O02_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O02_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>{' '}
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-03: Minimize waiting time
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O03_Level')}
                name="O03_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O03_Level?.message && `*${errors.O03_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O03_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>{' '}
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-04: Minimize number of subjects per lecturer per semester
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O04_Level')}
                name="O04_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O04_Level?.message && `*${errors.O04_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O04_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>{' '}
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">O-05: Quota of classes</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O05_Level')}
                name="O05_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O05_Level?.message && `*${errors.O05_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O05_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-06: Select the priority of moving distance between 2
                consecutive slots
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O06_Level')}
                name="O06_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O06_Level?.message && `*${errors.O06_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O06_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-07: Preference level of subjects
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O07_Level')}
                name="O07_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O07_Level?.message && `*${errors.O07_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O07_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                O-08: Preference level of slots
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('O08_Level')}
                name="O08_Level"
                variant="outlined"
                sx={{ maxWidth: 350, width: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.O08_Level?.message && `*${errors.O08_Level?.message}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <Controller
                  name="O08_Activated"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Fragment>
                      <FormControlLabel
                        label=""
                        control={<Checkbox checked={field.value} />}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: 'error.main', fontStyle: 'italic' }}
                      >
                        Activated Objective
                      </Typography>
                    </Fragment>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container item xs={12} sx={{ mt: 2, justifyContent: 'center' }}>
            <LoadingButton
              loading={loadingExecuted}
              loadingPosition="start"
              size="medium"
              type="submit"
              startIcon={
                <Image
                  src={images.iconExecute}
                  sx={{ width: 15, height: 15 }}
                  alt=""
                />
              }
            >
              Execute
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
});

export default SettingModelDialog;
