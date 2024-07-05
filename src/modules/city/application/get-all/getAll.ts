import { City } from "../../domain/City";
import { CityRepository } from "../../domain/CityRepository";

export function getAll(cityRepository: CityRepository) {
  return async (): Promise<City[]> => {
    return await cityRepository.getAll();
  };
}
