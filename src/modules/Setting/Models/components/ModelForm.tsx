import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';

interface Props {}

const ModelForm = (props: Props) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Typography component="span" variant="body1">
            Model
          </Typography>
          <Typography component="span" variant="body1" color="error.main">
            *
          </Typography>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">Select optimization model</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: 350 }}>
              <InputLabel>Select Solver</InputLabel>
              <Select value="">
                <MenuItem disabled value="">
                  <em>Select Solver</em>
                </MenuItem>
                <MenuItem value={10}>OR-Tools</MenuItem>
                <MenuItem value={20}>CPLEX</MenuItem>
                <MenuItem value={30}>NGSA-II</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: 350 }}>
              <InputLabel>Select Solver</InputLabel>
              <Select value="">
                <MenuItem disabled value="">
                  <em>Select Strategy</em>
                </MenuItem>
                <MenuItem value={10}>Scalarization</MenuItem>
                <MenuItem value={20}>Constraint Programming</MenuItem>
                <MenuItem value={30}>Compromised Programming</MenuItem>
                <MenuItem value={30}>Pareto based</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">
              Select the priority of moving distance between 2 consecutive slots
              (O-04)
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup
              name="moving-priority"
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                value="0"
                control={<Radio />}
                label="0"
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value="1"
                control={<Radio />}
                label="1"
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value="2"
                control={<Radio />}
                label="2"
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value="3"
                control={<Radio />}
                label="3"
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value="4"
                control={<Radio />}
                label="4"
                labelPlacement="top"
              />
              <FormControlLabel
                sx={{ m: 0 }}
                value="5"
                control={<Radio />}
                label="5"
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">Select applied objectives</Typography>
          </Grid>
          <Grid item container xs={8} spacing={1.5}>
            <Grid item xs={6}>
              <FormControlLabel
                value="1"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-01: Evaluate the cost of time between lessons"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="4"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-04: Moving distance between 2 consecutive lessons "
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="2"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-02: Minimize number of subjects per lecturer per semester"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="3"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-03: Quota of classes"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="5"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-05: Preference level of subjects"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="6"
                control={<Checkbox size="medium" sx={{ pr: 2 }} />}
                label="O-06: Preference level of slots"
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Typography variant="body1">Select input type</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: 350 }}>
              <InputLabel>Select Solver</InputLabel>
              <Select value="" sx={{ maxWidth: 350 }}>
                <MenuItem disabled value="">
                  <em>Select input type</em>
                </MenuItem>
                <MenuItem value={10}>Insert Settings</MenuItem>
                <MenuItem value={20}>Import excel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="medium" sx={{ px: 5, mt: 5 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ModelForm;
