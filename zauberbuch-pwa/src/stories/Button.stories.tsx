import React from 'react';
import { Button } from '@mui/material';

export default {
  title: 'Beispiel/Button',
  component: Button
};

export const Default = () => <Button variant="contained">Hallo Welt</Button>;

export const Secondary = () => <Button variant="outlined">Sekundär</Button>;
