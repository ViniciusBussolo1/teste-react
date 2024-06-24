"use client";

import { useUsers } from "@/hooks/useUser";
import Image from "next/image";

export function List() {
  const { users, filter, setFilter } = useUsers();

  if (users.length === 0) return <h1>Carregando...</h1>;

  return (
    <>
      <input
        type="text"
        placeholder="Busque pela função do usúario"
        className="w-96 my-6 ml-4"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <ul className="grid grid-cols-8 gap-9 ml-3">
        {users.map((user) => (
          <li key={user.id}>
            <Image src={user.image} alt="" width={100} height={100} />
            <div className="flex flex-col">
              <p>
                {user.firstName} {user.lastName}
              </p>

              <p>{user.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
