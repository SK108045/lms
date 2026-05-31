export type UserRole = "admin" | "instructor" | "student";
export type CourseStatus = "draft" | "pending" | "published" | "archived";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type EnrollmentStatus = "active" | "completed" | "cancelled";

export interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  role: UserRole;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  createdAt: Date;
}

export interface Course {
  id: string;
  instructorId: string;
  categoryId: string | null;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  thumbnailUrl: string | null;
  price: string;
  isFree: boolean;
  status: CourseStatus;
  durationHours: number | null;
  difficulty: string | null;
  requirements: string[] | null;
  whatYouLearn: string[] | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  instructor?: Profile;
  category?: Category;
  lessons?: Lesson[];
  enrollmentCount?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  content: string | null;
  videoUrl: string | null;
  durationMinutes: number | null;
  orderIndex: number;
  isPreview: boolean;
  createdAt: Date;
  updatedAt: Date;
  resources?: Resource[];
  quizzes?: Quiz[];
}

export interface Resource {
  id: string;
  lessonId: string;
  title: string;
  fileUrl: string;
  fileType: string | null;
  fileSize: number | null;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: string;
  enrolledAt: Date;
  completedAt: Date | null;
  course?: Course;
  user?: Profile;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  watchTimeSeconds: number | null;
  createdAt: Date;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimitMinutes: number | null;
  createdAt: Date;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string | null;
  orderIndex: number;
  createdAt: Date;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  startedAt: Date;
  completedAt: Date | null;
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
  course?: Course;
}

export interface MpesaTransaction {
  id: string;
  paymentId: string | null;
  merchantRequestId: string;
  checkoutRequestId: string;
  phoneNumber: string;
  amount: string;
  accountReference: string | null;
  transactionDesc: string | null;
  resultCode: number | null;
  resultDesc: string | null;
  mpesaReceiptNumber: string | null;
  transactionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateNumber: string;
  issuedAt: Date;
  course?: Course;
  user?: Profile;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalCourses: number;
  enrolledCourses: number;
  completedCourses: number;
  certificatesEarned: number;
  totalLearningHours: number;
}

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
}

export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  pendingCourses: number;
}
