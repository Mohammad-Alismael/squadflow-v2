interface IWorkspace {
  _id?: string;
  created_by?: string;
  updated_by?: string;
  community?: string;
  title?: string;
  participants: Array<{
    user: string;
    role: string;
  }>;
  columns?: { order: number; title: string; color: string }[];
  labels?: { color: string; title: string }[];
  progress?: number;
}
