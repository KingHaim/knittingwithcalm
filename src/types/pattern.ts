export interface Pattern {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  yarnWeight: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  age: 'Baby' | 'Child' | 'Adult';
  gender?: 'Unisex' | 'Male' | 'Female';
  videoUrl?: string;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  patterns: Pattern[];
  price: number;
  savings: number;
}