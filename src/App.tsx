import { useState } from 'react'
import { Box, Stack, Button, Typography, CircularProgress } from '@mui/material'
import { Add } from '@mui/icons-material'

import { ItemForm } from './components/ItemForm'
import { ItemsTable } from './components/ItemsTable'
import { useGetItemsQuery } from './redux/slices/api'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading } = useGetItemsQuery({})

  if (isLoading) {
    return (
      <Stack
        component="main"
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          w: '100vw',
          h: '100vh',
        }}
      >
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack component="main" sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Submittals
      </Typography>
      <Box sx={{ width: 'fit-content' }}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          <Add />
          Create Item
        </Button>
      </Box>
      <ItemsTable />
      <ItemForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </Stack>
  )
}

export default App
