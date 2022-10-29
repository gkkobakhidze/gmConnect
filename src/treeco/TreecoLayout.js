import {  Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import NavBar from './NavBar';
// ----------------------------------------------------------------------

export default function TreecoLayout() {
  return (
    <Stack alignItems="center" >
      <NavBar/>
      <Outlet />
    </Stack>
  );
}
