import React, { useState } from 'react';
import { FormControlLabel, Button, Grid, RadioGroup, FormControl, MenuItem, InputAdornment, OutlinedInput, Alert } from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomSelect from '../theme-elements/CustomSelect';
import CustomCheckbox from '../theme-elements/CustomCheckbox';
import CustomRadio from '../theme-elements/CustomRadio';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import CustomSwitch from '../../../../src/components/forms/theme-elements/CustomSwitch';
import ParentCard from '../../shared/ParentCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';

import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const numbers = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
  {
    value: 'four',
    label: 'Four',
  },
];

const validationSchema = yup.object({
  emailInstant: yup.string().email('Enter a valid email').required('Email is required'),
  passwordInstant: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const FbDefaultForm = () => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  

  const handleChange2 = (event: any) => {
    setValue(event.target.value);
  };

  const [number, setNumber] = React.useState('');

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };
  
  const [text, setText] = useState('');
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const formik = useFormik({
    initialValues: {
      emailInstant: '',
      passwordInstant: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(values.emailInstant);
    },
  });

  return (
    <ParentCard title="Default Form" >      
      <form onSubmit={formik.handleSubmit}>
      <Alert severity="info">Person Info</Alert>
        <CustomFormLabel
          sx={{
            mt: 0,
          }}
          htmlFor="default-value"
        >
          Default Text
        </CustomFormLabel>
        <CustomTextField
          id="default-value"
          variant="outlined"
          defaultValue="George deo"
          fullWidth
          required
          sx={{
            '& input:valid + fieldset': {
              borderColor: '#39cb7f',
            },
            '& input:invalid + fieldset': {
              borderColor: '#fc4b6c',
            },
          }}
        />
        <FormControl fullWidth>
        <CustomFormLabel htmlFor="email-text">Email</CustomFormLabel>        
        <CustomTextField
            fullWidth
            id="emailInstant"
            name="emailInstant"
            value={formik.values.emailInstant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.emailInstant && Boolean(formik.errors.emailInstant)}
            helperText={formik.touched.emailInstant && formik.errors.emailInstant}
          />
        {/* <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconMail width={20} />
              </InputAdornment>
            }
            id="mail-text"
            placeholder="Email"
            fullWidth                     
          /> */}
        </FormControl>
        <FormControl fullWidth>
          <CustomFormLabel htmlFor="default-outlined-password-input">Password</CustomFormLabel>
          <OutlinedInput
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            id="pwd-text"
            placeholder="Password"
            fullWidth
          />
          {/* <CustomTextField
            id="default-outlined-password-input"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
          /> */}
        </FormControl>
        <CustomFormLabel htmlFor="outlined-multiline-static">Textarea</CustomFormLabel>

        <CustomTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <CustomFormLabel htmlFor="readonly-text">Read Only</CustomFormLabel>

        <CustomTextField
          id="readonly-text"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          fullWidth
        />
        <Grid container spacing={0} my={2}>
          <Grid item lg={4} md={6} sm={12}>
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Check this custom checkbox"
            />
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Check this custom checkbox"
            />
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={state.checkedC}
                  onChange={handleChange}
                  name="checkedC"
                  color="primary"
                />
              }
              label="Check this custom checkbox"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange2}>
                <FormControlLabel
                  value="radio1"
                  control={<CustomRadio />}
                  label="Toggle this custom radio"
                />
                <FormControlLabel
                  value="radio2"
                  control={<CustomRadio />}
                  label="Toggle this custom radio"
                />
                <FormControlLabel
                  value="radio3"
                  control={<CustomRadio />}
                  label="Toggle this custom radio"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <CustomFormLabel htmlFor="standard-select-number">Select</CustomFormLabel>
        <CustomSelect
          fullWidth
          id="standard-select-number"
          variant="outlined"
          value={number}
          onChange={handleChange3}
          sx={{
            mb: 2,
          }}
        >
          {numbers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
        <Grid item lg={6} md={12} sm={12}>
          <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>
          <CustomTextField
            id="date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* ----------------------------------- */}
        {/* column 2 */}
        {/* ----------------------------------- */}
        <Grid item xs={12} sm={12} lg={4}>
          <CustomFormLabel htmlFor="time">Time</CustomFormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={value2}
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  fullWidth
                  sx={{
                    '& .MuiSvgIcon-root': {
                      width: '18px',
                      height: '18px',
                    },
                    '& .MuiFormHelperText-root': {
                      display: 'none',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        {/* ----------------------------------- */}
        {/* column 3 */}
        {/* ----------------------------------- */}
        <Grid item xs={12} sm={12} lg={4}>            
          <CustomFormLabel htmlFor="date">Date</CustomFormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  sx={{
                    '& .MuiSvgIcon-root': {
                      width: 18,
                      height: 18,
                    },
                    '& .MuiFormHelperText-root': {
                      display: 'none',
                    },
                  }}
                />
              )}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>                
        {/* ----------------------------------- */}
        {/* column 7 */}
        {/* ----------------------------------- */}

        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormLabel>Switch</CustomFormLabel>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel control={<CustomSwitch />} label="Enter text" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel control={<CustomSwitch defaultChecked />} label="Enter text" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    disabled
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-disabled+.MuiSwitch-track': {
                        opacity: 1,
                      },
                    }}
                  />
                }
                label="Disabled"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    defaultChecked
                    disabled
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
                        opacity: 0.5,
                      },
                    }}
                  />
                }
                label="Disabled"
              />
            </Grid>
          </Grid>            
        </Grid>
        <Paper
        sx={{ border: `1px solid ${borderColor}` }}
        variant="outlined"
        >
        <ReactQuill
          value={text}
          onChange={(value) => {
            setText(value);
          }}
          placeholder="Type here..."
        />
        </Paper>                    
        <div>
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </ParentCard>
  );
};

export default FbDefaultForm;
