import { City } from "../../domain/City";
import { CityRepository } from "../../domain/CityRepository";

export function getAllCitiesByState(cityRepository: CityRepository) {
  return async (idState: number): Promise<City[]> => {
    return await cityRepository.getAllByState(idState);
  };
}
