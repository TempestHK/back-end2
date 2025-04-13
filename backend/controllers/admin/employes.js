import employes from "../../models/admin/employes.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const getEmployes = asyncHandler(async (req, res) => {


  // console.log("req.body of admin's emplay", req.body);
  const current = Number(req.body.current ?? 0); 
  const pageSize = Number(req.body.pageSize ?? 20);
  const search = req.body.search || "";

  // console.log("current", current, "pageSize", pageSize, "search", search);

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

  // console.log("employesList", employesList);
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
  const { first_name, last_name, gender, email, phone, role_name } = req.body;

  console.log("req.body:", req.body);
  console.log("Creating employee with data:", { first_name, last_name, gender, email, phone, role_name });

  const employe = new employes({
    first_name: first_name || "Sample first name",
    last_name: last_name || "Sample last name",
    gender: gender || "Sample gender",
    email: email || "Sample email",
    phone: phone || "Sample phone",
    role_name: role_name || "Sample role_name",
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
  const { first_name , last_name , gender, email, phone ,  role_name } = req.body;

  const employe = await employes.findById(req.params.id);
  if (employe) {
    employe.first_name = first_name;
    employe.last_name = last_name;
    employe.gender = gender;
    employe.email = email;
    employe.phone = phone;
    employe.role_name = role_name;

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
    await employe.deleteOne();
    res.json({ message: "Employe removed successfully" });
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