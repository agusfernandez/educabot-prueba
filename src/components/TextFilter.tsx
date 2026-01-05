import React from 'react'
import { TextField, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

interface TextFilterProps {
  value: string
  onChange: (value: string) => void
}

export const TextFilter: React.FC<TextFilterProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <SearchIcon color="action" />
      <TextField
        size="small"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ minWidth: 250 }}
      />
    </Box>
  )
}