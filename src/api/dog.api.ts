export const fetchDogs = async (
  breed: string,
  count: number = 1
): Promise<string[]> => {
  const res = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/${count}`
  );
  const json = await res.json();
  return json.message;
};

export const fetchAllDogBreeds = async () => {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const json = await res.json();
  return Object.keys(json.message);
};
