import { createTheme} from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary:    {main:"#3D405B"},
    secondary:  {main:"#F4F1DE"},
    error:      {main:"#E63946"},
    warning:    {main:"#F1FAEE"},
    info:       {main:"#A8DADC"}
    // success

  },
});

// export default function UsingColorObject() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Button variant="contained">Primary</Button>
//       <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
//         Secondary
//       </Button>
//     </ThemeProvider>
//   );
// }