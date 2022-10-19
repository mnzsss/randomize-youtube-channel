export function getUniqueValuesFromArray<T>(array: T[], arg?: keyof T) {
  if (arg == null) {
    return array.filter(
      (arrayElement, i, src) =>
        i === src.findIndex((el) => el === arrayElement),
    );
  }

  return array.filter((arrayElement, i, src) => {
    const uniques =
      i ===
      src.findIndex((el) => {
        const isUnique = el[arg] === arrayElement[arg];

        return isUnique;
      });

    return uniques;
  });
}
