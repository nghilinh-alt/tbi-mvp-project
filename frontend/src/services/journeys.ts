/**
 * Employment Journeys Service - WCAG 2.1 AA Compliant
 */

import apiClient from './api';

export interface JourneyStage {
  stage: string;
  date: string;
  notes?: string;
}

export async function getEmploymentJourneys() {
  try {
    const response = await apiClient.get('/journeys/');
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Failed to load employment journeys:', error);
    return {
      success: false,
      error: error.response?.data?.detail || 'Failed to load journey data'
    };
  }
}

export async function getStages(): Promise<JourneyStage[]> {
  const stages: JourneyStage[] = [
    { stage: 'awareness', date: '-', notes: '-' },
    { stage: 'assessment', date: '-', notes: '-' },
    { stage: 'skill-development', date: '-', notes: '-' },
    { stage: 'job-matching', date: '-', notes: '-' },
    { stage: 'application', date: '-', notes: '-' },
    { stage: 'employment', date: '-', notes: '-' },
    { stage: 'retention', date: '-', notes: '-' }
  ];
  
  return stages;
}
