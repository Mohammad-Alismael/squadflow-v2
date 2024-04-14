interface IWorkspace {
  _id?: string;
  created_by: string;
  community: string;
  title: string;
  participants: {
    user: string;
    role: string;
  }[];
  columns: { order: number; title: string; color: string }[];
  progress: number;
}
