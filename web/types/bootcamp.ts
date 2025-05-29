type Instructor = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

type Curriculum = {
  week: number;
  title: string;
  topics: string[];
};

type FAQ = {
  question: string;
  answer: string;
};

export type CourseType = {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  schedule: string;
  startDate: string;
  price: string;
  level: string;
  prerequisites: string[];
  image: string;
  instructors: Instructor[];
  curriculum: Curriculum[];
  faqs: FAQ[];
};
