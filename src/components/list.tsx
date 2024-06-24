"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function List() {
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setList(data.users));
  });

  if (list.length === 0) return <h1>Carregando...</h1>;

  const listFiltered = list.filter((item) =>
    item.role.toLowerCase().includes(filter)
  );

  return (
    <>
      <input
        type="text"
        placeholder="Busque pela função do usúario"
        className="w-96 my-6 ml-4"
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className="grid grid-cols-8 gap-9 ml-3">
        {listFiltered.map((user) => (
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
