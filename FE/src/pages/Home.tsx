import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserEntity {
  id: number;
  username: string;
  email: string;
}

interface CarsEntity {
  id: number;
  car_name: string;
  car_categories: string;
  car_size: string;
  status_rental: string;
  car_img: string;
  created_by: UserEntity;
}

const cars_api_base_url: string = "http://localhost:8080";


export default function Home() {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(cars_api_base_url + "/api/cars");
      const responseJSON = await response.json();
      console.log("response", response);

      setCars(responseJSON.data.cars);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) setLoggedIn(true);
      else setLoggedIn(false);
    };

    fetchCars();
    checkIsLoggedIn();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('access_token');

    setLoggedIn(false);
  };

  return (
    <div className="flex w-full bg-gray-300 place-content-center min-h-screen">
      <div className="w-[600px] bg-gray-200 p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold underline">Home</h1>
          {isLoggedIn ? (
            <button
              className='py-2 px-3 bg-black text-white rounded-lg'
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className='py-2 px-3 bg-black text-white rounded-lg'>
                Login
              </button>
            </Link>
          )}
        </div>
        <div className="mt-[30px]">
          <h1 className="font-bold text-xl">List Car</h1>
          <div className="mt-[10px]">
            {!cars.length && <div>Data Kosong</div>}
            {cars &&
              cars.map((cars: CarsEntity) => (
                <div key={cars.id} className="mt-3">
                  <h1 className="flex">nama mobil: <strong>{cars.car_name}</strong></h1>
                  <p>ketegori mobil:{cars.car_categories}</p>
                  <p>ukuran mobil: {cars.car_size}</p>
                  <p>status mobil: {cars.status_rental}</p>
                  <p>link gambar : {cars.car_img}</p>
                  <p>dibuat oleh : {cars.created_by.username}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
