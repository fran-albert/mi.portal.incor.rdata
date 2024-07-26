import axiosInstance from "@/services/axiosConfig";
import axios from "axios";
import { LabsRepository } from "../domain/LabsRepository";
import { Labs } from "../domain/Labs";

export function createApiLabRepository(): LabsRepository {
    async function getLabsDetail(idUser: number): Promise<Labs[]> {
        const response = await axiosInstance.get(`Study/laboratories/${idUser}`);
        const labDetail = response.data as Labs[];
        return labDetail;
    }

    async function getTotalLabs(): Promise<number> {
        const response = await axiosInstance.get(`Study/all/laboratories`);
        const totalLabs = response.data as number;
        return totalLabs;
    }

    return {
        getLabsDetail, getTotalLabs
    };
}
