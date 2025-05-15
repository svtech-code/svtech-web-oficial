interface Technology {
  icon: any;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  image: any;
  date: string;
  status: boolean;
  technology?: Technology[];
}
