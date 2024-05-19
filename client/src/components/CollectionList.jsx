import { useEffect, useState } from "react";
import { getAllCollections } from "../api/collections.api";
import { RecipeCard } from "./RecipeCard";

export function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function loadData() {
      const collectionsRes = await getAllCollections();
      setCollections(collectionsRes.data);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      {collections.map((collection) => (
        <RecipeCard key={collections.id} collection={collection} />
      ))}
    </div>
  );
}
