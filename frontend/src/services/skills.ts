/**
 * Skills Assessment Service - WCAG 2.1 AA Compliant
 */

import apiClient from './api';

export interface Skill {
  id: string;
  name: string;
  category: 'communication' | 'technical' | 'adaptive' | 'vocational';
  currentLevel: number; // 1-5
  targetLevel: number; // 1-5
  goals: string[];
  lastAssessed: string;
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await apiClient.get('/skills/');
    return response.data || [];
  } catch (error: any) {
    console.error('Failed to load skills:', error);
    return [] as Skill[];
  }
}

export async function getSkillAssessment(skillId: string): Promise<any> {
  try {
    const response = await apiClient.get(`/skills/${skillId}/`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to load skill assessment:', error);
    throw new Error('Unable to load skill assessment data');
  }
}

export async function recordSkillProgress(skillId: string, progress: number): Promise<boolean> {
  try {
    await apiClient.patch(`/skills/${skillId}/`, { progress });
    return true;
  } catch (error: any) {
    console.error('Failed to record skill progress:', error);
    return false;
  }
}
