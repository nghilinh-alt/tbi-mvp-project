/**
 * TBI Employment Pathways MVP - TypeScript Type Definitions
 * WCAG 2.1 AA Compliant Application
 */

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'participant';
  tbiDiagnosisDate?: string;
  createdAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'participant';
}

// Employment Journey types
export interface EmploymentStage {
  stage: string;
  date: string;
  notes?: string;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface EmploymentJourney {
  stages: EmploymentStage[];
  createdAt: string;
  updatedAt: string;
}

// Skills Assessment types
export interface SkillAssessment {
  id: string;
  skillName: string;
  proficiencyLevel: number; // 1-5
  category: 'communication' | 'technical' | 'adaptive' | 'vocational';
  lastAssessed: string;
  nextReviewDate?: string;
  goals: string[];
}

// Job Opportunity types
export interface JobOpportunity {
  id: string;
  title: string;
  employer: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  accessibilityFeatures: string[];
  tbiFriendly: boolean;
  skillsRequired: string[];
  applicationDeadline?: string;
  postedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: 'bearer';
}

// Dashboard widgets
export interface DashboardWidget {
  id: string;
  title: string;
  icon: string;
  data: Record<string, any>;
  lastUpdated: string;
}

// Form field types for accessibility
export interface FormField<T = any> {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'date' | 'select' | 'textarea' | 'checkbox';
  value: T;
  error?: string;
  required?: boolean;
  ariaLabel?: string;
}

// Employment pathway stages
export enum EmploymentStageType {
  AWARENESS = 'awareness',
  ASSESSMENT = 'assessment',
  SKILL_DEVELOPMENT = 'skill-development',
  JOB_MATCHING = 'job-matching',
  APPLICATION = 'application',
  EMPLOYMENT = 'employment',
  RETENTION = 'retention'
}

// Skills categories
export enum SkillCategory {
  COMMUNICATION = 'communication',
  TECHNICAL = 'technical',
  ADAPTIVE = 'adaptive',
  VOCATIONAL = 'vocational'
}
