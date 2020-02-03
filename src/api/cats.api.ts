export const fetchCats = async (breed: string): Promise<string[]> => {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?q=${breed}`
  );
  const json = await res.json();
  return json.map(({ url }: { url: string }) => url);
};

export const fetchAllCatBreeds = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const json = await res.json();
  return json.map(({ name }: { name: string }) => name);
};
