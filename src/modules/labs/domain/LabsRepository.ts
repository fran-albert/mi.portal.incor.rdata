import { Labs } from "./Labs";

export interface LabsRepository {
    getLabsDetail: (id: number) => Promise<Labs[]>;

}
