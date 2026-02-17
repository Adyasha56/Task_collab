import List from "../models/List.js";

export const createList = async (req, res) => {
  const list = await List.create(req.body);
  res.json(list);
};