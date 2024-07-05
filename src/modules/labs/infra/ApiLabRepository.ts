import axiosInstance from "@/services/axiosConfig";
import axios from "axios";
import { LabsRepository } from "../domain/LabsRepository";
import { Labs } from "../domain/Labs";

export function createApiLabRepository(): LabsRepository {
    async function getLabsDetail(id: number): Promise<Labs[]> {
        const response = await axiosInstance.get(`Study/laboratories/${id}`);
        const labDetail = response.data as Labs[];
        return labDetail;
    }

    return {
        getLabsDetail,
    };
}
