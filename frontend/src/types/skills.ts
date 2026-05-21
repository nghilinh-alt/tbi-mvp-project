// Skills assessment response type
export interface SkillAssessmentResult {
  userId: string;
  journeyId: string;
  timestamp: Date;
  completedAt?: Date;
  score: number; // 0-100
  skillsAssessed: SkillAssessmentItem[];
  recommendations: Recommendation[];
  nextSteps: NextStep[];
}

export interface SkillAssessmentItem {
  skillId: string;
  skillName: string;
  questionId: string;
  questionText: string;
  type: 'multiple-choice' | 'ranking' | 'scale';
  options?: string[];
  selectedOption?: number;
  score: number; // 0-10 for this item
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'course' | 'resource' | 'action';
  priority: 'high' | 'medium' | 'low';
  url?: string;
}

export interface NextStep {
  id: string;
  title: string;
  description: string;
  estimatedTimeMinutes: number;
  actionUrl: string;
}
