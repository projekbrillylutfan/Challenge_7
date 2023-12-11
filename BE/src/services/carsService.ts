import { CarRequest, CarResponse } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/carsRepo";

class CarServices {
  static async getCarsReady(): Promise<Car[]> {
    let listCar: Car[] = [];

    listCar = await CarsRepository.getCarsReady();

    return listCar;
  }
  static async getCars(): Promise<Car[]> {
    let listCar: Car[] = [];

    listCar = await CarsRepository.getCars();

    const listCarResponse: CarResponse[] = listCar.map((car) => {
      const carResponse: CarResponse = {
        id: car.id as number,
        car_name: car.car_name,
        car_categories: car.car_categories,
        car_size: car.car_size,
        status_rental: car.status_rental,
        car_img: car.car_img,
        created_by: {
          id: car.created_by?.id as number,
          username: car.created_by?.username as string,
          email: car.created_by?.email as string,
        },
        updated_by: {
          id: car.updated_by?.id as number,
          username: car.created_by?.username as string,
          email: car.updated_by?.email as string,
        },
        deleted_by: {
          id: car.deleted_by?.id as number,
          username: car.created_by?.username as string,
          email: car.deleted_by?.email as string,
        },
      };
      return carResponse;
    });

    return listCarResponse;
  }
  static async getCarsById(queryId: number): Promise<Car[]> {
    const listCar = await CarsRepository.getCarsById(queryId);
    return listCar;
  }
  static async createCar(car: CarRequest): Promise<Car> {
    const carToCreate: Car = {
      car_name: car.car_name,
      car_categories: car.car_categories,
      car_size: car.car_size,
      status_rental: car.status_rental,
      car_img: car.car_img,
      create_by: car.create_by,
      create_at: car.create_at,
    };
    const createdCar = await CarsRepository.createCar(carToCreate);

    // const listCar = await CarsRepository.getCars();

    // await CarsRepository.setCarCache(listCar);

    return createdCar;
  }

  static async updateCarById(
    queryId: number,
    car: CarRequest
  ): Promise<Car | null> {
    const carToUpdate: Car = {
      car_name: car.car_name,
      car_categories: car.car_categories,
      car_size: car.car_size,
      status_rental: car.status_rental,
      car_img: car.car_img,
      update_by: car.update_by,
      update_at: car.update_at,
    };
    const updatedCar = await CarsRepository.updateCarById(queryId, carToUpdate);
    return updatedCar;
  }

  static async deleteCarById(queryId: number, deletedBy: number): Promise<Car | null> {
    const deletedCar = await CarsRepository.deleteCarById(queryId, deletedBy);
    return deletedCar;
  }
}

export default CarServices;
