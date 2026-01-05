
export interface Enrollment {
  id: string
  student_name: string
  email: string
  workshop: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: Date | string
}

export type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled'