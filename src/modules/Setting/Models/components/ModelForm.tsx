import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { SOLVER, STRATEGY } from '~/constants';
import { useState, ChangeEvent } from 'react';

const ModelForm = () => {
  const [solver, setSolver] = useState<number>(0);
  const [strategy, setStrategy] = useState<number>(0);
  const [inputType, setInputType] = useState<number>(0);
  const [O_01_Level, setO_01_Level] = useState<number>(0);
  const [O_02_Level, setO_02_Level] = useState<number>(0);
  const [O_03_Level, setO_03_Level] = useState<number>(0);
  const [O_04_Level, setO_04_Level] = useState<number>(0);
  const [O_05_Level, setO_05_Level] = useState<number>(0);
  const [O_06_Level, setO_06_Level] = useState<number>(0);

  const onChangeSolver = (event: SelectChangeEvent<number>) => {
    setSolver((event.target.value as number) || 0);
  };
  const onChangeStrategy = (event: SelectChangeEvent<number>) => {
    setStrategy((event.target.value as number) || 0);
  };
  const onChangeInputType = (event: SelectChangeEvent<number>) => {
    setInputType((event.target.value as number) || 0);
  };
  const onChangeO_01_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_01_Level(Number(value) || 0);
  };
  const onChangeO_02_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_02_Level(Number(value) || 0);
  };
  const onChangeO_03_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_03_Level(Number(value) || 0);
  };
  const onChangeO_04_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_04_Level(Number(value) || 0);
  };
  const onChangeO_05_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_05_Level(Number(value) || 0);
  };
  const onChangeO_06_Level = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setO_06_Level(Number(value) || 0);
  };

  const onSaveSetting = () => {};

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
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
            <Typography variant="body1">Select input type</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              value={inputType}
              onChange={onChangeInputType}
              sx={{ maxWidth: 350, width: 1 }}
            >
              <MenuItem disabled value={0}>
                <em>Select input type</em>
              </MenuItem>
              <MenuItem value={10}>Insert Settings</MenuItem>
              <MenuItem value={20}>Import excel</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              O-01: Evaluate the cost of time between lessons
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_01_Level}
              onChange={onChangeO_01_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              O-02: Minimize number of subjects per lecturer per semester
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_02_Level}
              onChange={onChangeO_02_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">O-03: Quota of classes</Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_03_Level}
              onChange={onChangeO_03_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              O-04: Select the priority of moving distance between 2 consecutive
              slots
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_04_Level}
              onChange={onChangeO_04_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              O-05: Preference level of subjects
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_05_Level}
              onChange={onChangeO_05_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              O-06: Preference level of slots
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              value={O_06_Level}
              onChange={onChangeO_06_Level}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value={0}
                control={<Radio />}
                label={0}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={1}
                control={<Radio />}
                label={1}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={2}
                control={<Radio />}
                label={2}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={3}
                control={<Radio />}
                label={3}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={4}
                control={<Radio />}
                label={4}
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value={5}
                control={<Radio />}
                label={5}
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="medium" sx={{ px: 5, mt: 5 }} onClick={onSaveSetting}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ModelForm;
