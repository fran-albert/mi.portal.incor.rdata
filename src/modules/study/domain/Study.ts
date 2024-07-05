export interface Study {
  id: number;
  name: string;
  locationS3?: string;
  date?: Date | string | undefined;
  studyType?: {
    id: number;
    name: string;
  };
  note?: string;
}
