import React from 'react';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme} from "@mui/material";
import { DataTable } from '../components';

const DBItems = () => {

  const defaultMaterialTheme = createTheme()
  return (
    <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
      <DataTable />
    </div>
  )
}

export default DBItems;