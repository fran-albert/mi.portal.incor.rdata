import { create } from 'zustand';
import { City } from '@/modules/city/domain/City';
import { createApiCityRepository } from '@/modules/city/infra/ApiCityRepository';
import { getAll } from '@/modules/city/application/get-all/getAll';
import { getAllCitiesByState } from '@/modules/city/application/get-all-by-state/getAllCitiesByState';

interface CityState {
    cities: City[];
    selectedCity: City | null;
    isLoading: boolean;
    error: string | null;
    fetchCities: () => Promise<void>;
    getCitiesByState: (stateId: number) => Promise<City[] | null>;
}

const cityRepository = createApiCityRepository();
const loadAllCities = getAll(cityRepository);
const loadCitiesByStateFn = getAllCitiesByState(cityRepository);

export const useCityStore = create<CityState>((set) => ({
    cities: [],
    selectedCity: null,
    isLoading: false,
    error: null,

    fetchCities: async () => {
        set({ isLoading: true });
        try {
            const cityData = await loadAllCities();
            set({ cities: cityData, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
        }
    },


    getCitiesByState: async (stateId) => {
        set({ isLoading: true });
        try {
            const cityData = await loadCitiesByStateFn(stateId);
            set({ cities: cityData, isLoading: false });
            return cityData;
        } catch (error) {
            set({ error: String(error), isLoading: false });
            return null;
        }
    }
}));
