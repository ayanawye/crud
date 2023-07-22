export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface INewPost {
  userId: number | null;
  id: number | null;
  title: string;
  body: string;
}
