export const selectAllText = (e) => {
  e.target.select();
};
export const saveContentAfterEnter = (e) => {
  if (e.key === "Enter") {
    e.target.blur();
    e.preventDefault();
  }
};
