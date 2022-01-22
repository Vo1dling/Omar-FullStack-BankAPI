import api from "../api/api";

const getUsers = async () => {
  const users = await api.get("/users");
  return users;
};
const onNumberInputChange = (e) => {
  const regex = /[\d]+/g;
  const newArr = e.target.value.split("").filter((x) => x.match(regex));
  e.target.value = newArr.join("");
};
const performAction = async (id, action, body) => {
  if (action !== "delete" && action !== "add user") {
    if (action === "update credit") action = "updateCredit";
    await api.put(`/users/${action}/${id}`, body);
  } else if (action === "delete") {
    await api.delete(`/users/${id}`);
  } else {
    const user = await api.post("/users", body);
    return user;
  }
};
export { getUsers, onNumberInputChange, performAction };
