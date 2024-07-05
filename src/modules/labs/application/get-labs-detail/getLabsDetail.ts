import { Labs } from "../../domain/Labs";
import { LabsRepository } from "../../domain/LabsRepository";

export function getLabsDetail(labsRepository: LabsRepository) {
    return async (idPatient: number): Promise<Labs[]> => {
        return await labsRepository.getLabsDetail(idPatient);
    };
}
