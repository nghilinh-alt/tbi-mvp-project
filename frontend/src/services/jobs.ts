/**
 * Job Opportunities Service - WCAG 2.1 AA Compliant
 */

import apiClient from './api';

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

export async function getJobOpportunities(): Promise<JobOpportunity[]> {
  try {
    const response = await apiClient.get('/jobs/');
    return response.data || [];
  } catch (error: any) {
    console.error('Failed to load job opportunities:', error);
    return [] as JobOpportunity[];
  }
}

export async function getTbiFriendlyJobs(): Promise<JobOpportunity[]> {
  try {
    const response = await apiClient.get('/jobs/tbi-friendly/');
    return response.data || [];
  } catch (error: any) {
    console.error('Failed to load TBI-friendly jobs:', error);
    return [] as JobOpportunity[];
  }
}

export async function postJobApplication(jobId: string, applicationData: {
  coverLetter?: string;
  resumeUrl?: string;
  availability: string;
}): Promise<boolean> {
  try {
    const response = await apiClient.post(`/jobs/${jobId}/applications/`, applicationData);
    return response.data.success;
  } catch (error: any) {
    console.error('Failed to submit job application:', error);
    return false;
  }
}
