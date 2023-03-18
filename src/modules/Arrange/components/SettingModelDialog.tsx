import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  Dialog,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import { SOLVER, STRATEGY } from '~/constants';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import { executeArrange } from '~/services/arrange';

interface Props {
  openDialog: boolean;
  onCloseDialog: () => void;
}

const SettingModelDialog = (props: Props) => {
  const { openDialog, onCloseDialog: onClose } = props;
  const { refetch } = useArrange();
  const [solver, setSolver] = useState<number>(0);
  const [strategy, setStrategy] = useState<number>(0);
  const [maxSearchingTime, setMaxSearchingTime] = useState<number>(0);
  const [O01_Level, setO01_Level] = useState<number>(0);
  const [O02_Level, setO02_Level] = useState<number>(0);
  const [O03_Level, setO03_Level] = useState<number>(0);
  const [O04_Level, setO04_Level] = useState<number>(0);
  const [O05_Level, setO05_Level] = useState<number>(0);
  const [O06_Level, setO06_Level] = useState<number>(0);
  const [O01_Activated, setO01_Activated] = useState<boolean>(false);
  const [O02_Activated, setO02_Activated] = useState<boolean>(false);
  const [O03_Activated, setO03_Activated] = useState<boolean>(false);
  const [O04_Activated, setO04_Activated] = useState<boolean>(false);
  const [O05_Activated, setO05_Activated] = useState<boolean>(false);
  const [O06_Activated, setO06_Activated] = useState<boolean>(false);
  const [loadingExecuted, setLoadingExecuted] = useState<boolean>(false);

  const setNotification = useNotification();

  const onChangeSolver = (event: SelectChangeEvent<number>) => {
    setSolver((event.target.value as number) || 0);
  };

  const onChangeStrategy = (event: SelectChangeEvent<number>) => {
    setStrategy((event.target.value as number) || 0);
  };

  const onChangeMaxSearchingTime = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setMaxSearchingTime(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO01Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO01_Level(parseInt(event.target.value));
    } else {
      setNotification({
        message: 'Enter a valid number',
        severity: 'error',
      });
    }
  };

  const onChangeO01Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO01_Activated(event.target.checked);
  };

  const onChangeO02Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO02_Level(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO02Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO02_Activated(event.target.checked);
  };

  const onChangeO03Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO03_Level(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO03Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO03_Activated(event.target.checked);
  };

  const onChangeO04Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO04_Level(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO04Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO04_Activated(event.target.checked);
  };

  const onChangeO05Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO05_Level(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO05Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO05_Activated(event.target.checked);
  };

  const onChangeO06Level = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      setO06_Level(parseInt(event.target.value));
    }
    if (event.target.value === '') setMaxSearchingTime(0);
  };

  const onChangeO06Activated = (event: ChangeEvent<HTMLInputElement>) => {
    setO06_Activated(event.target.checked);
  };

  const onArrange = () => {
    if (solver === 0 || strategy === 0 || maxSearchingTime === 0) {
      setNotification({
        message: 'All of solver, strategy, and max searching time is required',
        severity: 'error',
      });
      return;
    }
    setLoadingExecuted(true);
    executeArrange({
      maxSearchingTime: maxSearchingTime,
      objectiveOption: [
        O01_Activated ? 1 : 0,
        O02_Activated ? 1 : 0,
        O03_Activated ? 1 : 0,
        O04_Activated ? 1 : 0,
        O05_Activated ? 1 : 0,
        O06_Activated ? 1 : 0,
      ],
      objectiveWeight: [
        O01_Level,
        O02_Level,
        O03_Level,
        O04_Level,
        O05_Level,
        O06_Level,
      ],
      solver: solver,
      strategy: strategy,
    })
      .then((res) => {
        refetch();
        setNotification({
          message: 'Execute Arrange success',
          severity: 'success',
        });
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

  return (
    <Dialog maxWidth="md" open={openDialog} onClose={onClose}>
      <Grid container spacing={1} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Setting Before Execute
          </Typography>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">Max Searching Time</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeMaxSearchingTime}
              variant="outlined"
              value={maxSearchingTime}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Select optimization model</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              value={solver}
              onChange={onChangeSolver}
              sx={{ maxWidth: 350, width: 1 }}
            >
              <MenuItem disabled value={0}>
                <em>Select Solver</em>
              </MenuItem>
              <MenuItem value={SOLVER.ORTOOL}>OR-Tools</MenuItem>
              <MenuItem value={SOLVER.CPLEX}>CPLEX</MenuItem>
              <MenuItem value={SOLVER.NGSAII}>NGSA-II</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Select
              value={strategy}
              onChange={onChangeStrategy}
              sx={{ maxWidth: 350, width: 1 }}
            >
              <MenuItem disabled value={0}>
                <em>Select Strategy</em>
              </MenuItem>
              <MenuItem value={STRATEGY.SCALARIZATION}>Scalarization</MenuItem>
              <MenuItem value={STRATEGY.CONSTRAINT_PROGRAMMING}>
                Constraint Programming
              </MenuItem>
              <MenuItem value={STRATEGY.COMPROMISED_PROGRAMMING}>
                Compromised Programming
              </MenuItem>
              <MenuItem value={STRATEGY.PARETO_BASED}>Pareto based</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              O-01: Evaluate the cost of time between lessons
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO01Level}
              variant="outlined"
              value={O01_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O01_Activated}
                onChange={onChangeO01Activated}
              />
              {O01_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>{' '}
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              O-02: Minimize number of subjects per lecturer per semester
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO02Level}
              variant="outlined"
              value={O02_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O02_Activated}
                onChange={onChangeO02Activated}
              />
              {O02_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>{' '}
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">O-03: Quota of classes</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO03Level}
              variant="outlined"
              value={O03_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O03_Activated}
                onChange={onChangeO03Activated}
              />
              {O03_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>{' '}
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              O-04: Select the priority of moving distance between 2 consecutive
              slots
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO04Level}
              variant="outlined"
              value={O04_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O04_Activated}
                onChange={onChangeO04Activated}
              />
              {O04_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>{' '}
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              O-05: Preference level of subjects
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO05Level}
              variant="outlined"
              value={O05_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O05_Activated}
                onChange={onChangeO05Activated}
              />
              {O05_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              O-06: Preference level of slots
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={onChangeO06Level}
              variant="outlined"
              value={O06_Level}
              sx={{ maxWidth: 350, width: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row">
              <Checkbox
                checked={O06_Activated}
                onChange={onChangeO06Activated}
              />
              {O06_Activated && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  Activated Objective
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid container item xs={12} sx={{ mt: 2, justifyContent: 'center' }}>
          <LoadingButton
            loading={loadingExecuted}
            loadingPosition="start"
            size="medium"
            startIcon={
              <Image
                src={images.iconExecute}
                sx={{ width: 15, height: 15 }}
                alt=""
              />
            }
            onClick={onArrange}
          >
            Execute
          </LoadingButton>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SettingModelDialog;
