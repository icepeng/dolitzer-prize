export interface ImgurResponse {
  data: {
    id: string;
    title: string;
    description: string;
    datetime: number;
    link: string;
  };
  success: boolean;
  status: number;
}
