import React from 'react'
import {
  Button,
  Dialog,
  Stack,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  styled,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppDispatch } from '../redux/hooks'
import { addItem } from '../redux/slices/items'
import { Item, ItemPriority, ItemStatus } from '../types'

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
`

const CloseButton = styled('button')`
  width: fit-content;
  background: transparent;
  border: none;
  cursor: pointer;
`

const schema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.number().positive(),
  status: z.enum(['draft', 'submitted', 'approved', 'rejected']),
  priority: z.enum(['low', 'medium', 'high']),
})

type InputsType = z.infer<typeof schema>

export interface ItemFormProps {
  isOpen: boolean
  onClose: () => void
}

export const ItemForm: React.FC<ItemFormProps> = (props) => {
  const { isOpen, onClose } = props
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
  })

  const onSubmit = (data: InputsType) => {
    const { status, priority, ...rest } = data
    const newItem: Item = {
      ...rest,
      status: status as ItemStatus,
      priority: priority as ItemPriority,
      id: Math.floor(Math.random() * 10000),
    }
    dispatch(addItem(newItem))
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <Stack sx={{ bgcolor: 'background.paper', p: 4 }}>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ccc',
            pb: 2,
            position: 'sticky',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Item
          </Typography>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Stack>
        <Form action="#" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name', { required: 'Name is required' })}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description', {
              required: 'Description is required',
            })}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
            })}
            label="Amount"
            type="number"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />

          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              {...register('status', { required: 'Status is required' })}
              label="Status"
              labelId="status-label"
              error={!!errors.status}
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {['draft', 'submitted', 'approved', 'rejected'].map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {errors.status && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.status.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              {...register('priority', {
                required: 'Priority is required',
              })}
              label="Priority"
              labelId="priority-label"
              error={!!errors.priority}
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {['low', 'medium', 'high'].map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {errors.priority && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.priority.message}
              </FormHelperText>
            )}
          </FormControl>

          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create Item
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Dialog>
  )
}
