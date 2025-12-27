export interface Attribution {
  label: string;
  values: string[];
  showOnCard?: boolean;
}

export interface RankItem {
  rank: number;
  name: string;
  category?: string; 
  attributions: Attribution[];
  cover_image: string;
  sample_images: string[];
  description: string;
  description_source?: {
    name: string;
    link: string;
  };
  review_comment?: string;  
  link: string;
}