import { useRouter } from "next/router";

function ItemPage() {
  const { query } = useRouter();
  return (
    <main>
      <h1>ITEM PAGE</h1>
      <h2>{query.name_id}</h2>
    </main>
  );
}

export default ItemPage
