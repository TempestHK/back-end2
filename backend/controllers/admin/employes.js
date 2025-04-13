import employes from "../../models/admin/employes.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const getEmployes = asyncHandler(async (req, res) => {


  console.log("req.body of admin's emplay", req.body);
  const current = Number(req.body.current ?? 0); 
  const pageSize = Number(req.body.pageSize ?? 20);
  const search = req.body.search || "";

  console.log("current", current, "pageSize", pageSize, "search", search);

  const keyword = search
  ? {
      $or: [
        { last_name: { $regex: search, $options: "i" } },
        { first_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { role_name: { $regex: search, $options: "i" } },
      ],
    }
  : {};


  const count = await employes.countDocuments({ ...keyword });

  const employesList = await employes
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * current); 

  console.log("employesList", employesList);
  res.json({
    body: {

      items: employesList,
      total: count,
      current,
      pageSize,
    
    },
  });
});


const createEmployes = asyncHandler(async (req, res) => {
  const { name, code, created_by } = req.body;
  const employe = new employes({
    id: req.user._id,
    name: name || "Sample name",
    code: code || "Sample code",
    created_by: created_by || "Sample created_by",
  });

  const createdEmployes = await employe.save();
  res.status(201).json(createdEmployes);
});

const getEmployesById = asyncHandler(async (req, res) => {
  const employe = await employes.findById(req.params.id);
  if (employe) {
    res.json(employe);
  } else {
    res.status(404);
    throw new Error("Employe not found");
  }
});

const updateEmployes = asyncHandler(async (req, res) => {
  const { name, code, created_by } = req.body;
  const employe = await employes.findById(req.params.id);
  if (employe) {
    employe.name = name;
    employe.code = code;
    employe.created_by = created_by;

    const updatedEmployes = await employe.save();
    res.json(updatedEmployes);
  } else {
    res.status(404);
    throw new Error("Employe not found");
  }
});

const deleteEmployes = asyncHandler(async (req, res) => {
  const employe = await employes.findById(req.params.id);
  if (employe) {
    await employe.remove();
    res.json({ message: "Employe removed" });
  } else {
    res.status(404);
    throw new Error("Employe not found");
  }
});

export {
  getEmployes,
  createEmployes,
  getEmployesById,
  updateEmployes,
  deleteEmployes,
};