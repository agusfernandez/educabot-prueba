import { useEffect, useState } from 'react'
import { fetchEnrollments } from '../api/enrollments'
import type { Enrollment, StatusFilter } from '../types'

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [textFilter, setTextFilter] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    fetchEnrollments()
      .then((data: Enrollment[]) => setEnrollments(data))
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter
    const matchesText = textFilter === '' || 
      enrollment.student_name.toLowerCase().includes(textFilter.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(textFilter.toLowerCase())
    
    return matchesStatus && matchesText
  })

  const addEnrollment = (enrollment: Enrollment) => {
    setEnrollments([...enrollments, enrollment])
  }

  const confirmEnrollment = (id: string) => {
    setEnrollments(prevEnrollments =>
      prevEnrollments.map(enrollment =>
        enrollment.id === id ? { ...enrollment, status: 'confirmed' as const } : enrollment
      )
    )
  }

  return {
    enrollments: filteredEnrollments,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    textFilter,
    setTextFilter,
    addEnrollment,
    confirmEnrollment
  }
}