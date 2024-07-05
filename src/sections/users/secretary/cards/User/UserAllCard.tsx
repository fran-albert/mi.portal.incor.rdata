import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

export const UserCount = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const userRepository = createApiUserRepository();
      const total = await userRepository.getTotalUsers();
      setTotalUsers(total);
    };

    fetchTotalUsers().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ width: "250px", height: "120px", overflow: "auto" }}
      >
        <div className="w-2 bg-amber-500 rounded-l-xl"></div>
        <div className="flex-grow p-4">
          <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold">
            tOTAL usuarios
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {totalUsers}
            </p>
            <div className="flex-shrink-0">
              <FaUsers size={25} color="#1f2937" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
