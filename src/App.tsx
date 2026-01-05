import { useEnrollments } from './hooks/useEnrollments'
import { EnrollmentFilters } from './components/EnrollmentFilters'
import { TextFilter } from './components/TextFilter'
import { EnrollmentsTable } from './components/EnrollmentsTable'
import { NewEnrollmentForm } from './components/NewEnrollmentForm'
import { Layout } from './components/Layout'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

function App() {
  const {
    enrollments,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    textFilter,
    setTextFilter,
    addEnrollment,
    confirmEnrollment,
  } = useEnrollments()

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error">{error.message}</Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enrollments Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h6">Enrollments List</Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <TextFilter value={textFilter} onChange={setTextFilter} />
                      <EnrollmentFilters
                        currentFilter={statusFilter}
                        onFilterChange={setStatusFilter}
                      />
                    </Box>
                  </Box>
                  <EnrollmentsTable
                    enrollments={enrollments}
                    onConfirm={confirmEnrollment}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <NewEnrollmentForm onCreate={addEnrollment} />
          </Grid>
        </Grid>
      </Stack>
    </Layout>
  )
}

export default App