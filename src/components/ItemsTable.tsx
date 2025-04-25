import React, { useState } from 'react'
import { Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useAppSelector } from '../redux/hooks'
import { selectItems } from '../redux/slices/items'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'priority', headerName: 'Priority', width: 150 },
]

const initialPaginationModel = { page: 0, pageSize: 5 }

export const ItemsTable: React.FC = () => {
  const items = useAppSelector(selectItems)
  const [paginationModel, setPaginationModel] = useState(initialPaginationModel)
  console.log('Items:', items)

  return (
    <Paper sx={{ mt: 2 }}>
      <DataGrid
        rows={items}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel,
          },
        }}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
      />
    </Paper>
  )
}
