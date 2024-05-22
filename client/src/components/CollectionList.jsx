import { useEffect, useState } from "react";
import { getUserCollections } from "../api/collections.api";
import { CardsColecciones } from "./CardsColecciones";

export function CollectionList() {
  const [collections, setCollections] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      const collectionsRes = await getUserCollections(userId);
      setCollections(collectionsRes.data);
    }
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-10">
      {collections.map((collection) => (
        <CardsColecciones key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
