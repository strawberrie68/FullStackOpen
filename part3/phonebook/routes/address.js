// const router = require("express").Router();
// let Address = require("../models/address");

// router.get("/", (request, response) => {
//   response.send("<h1>This the api - use th keywords to get data</h1>");
// });

// router.get("/info", (request, response) => {
//   response.send(`
//   <div>
//     <p>Address has info for ${Address.length} people</p><br/>
//     <p>${Date(Date.now()).toString()}</p>
//   </div>
//   `);
// });

// router.get("/api/persons", (request, response) => {
//   response.json(Address);
// });

// router.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = Address.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// const generateId = () => {
//   return Math.floor(Math.random() * 100000);
// };

// router.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "name missing or number missing",
//     });
//   }

//   const isExist = Address.filter((person) => person.name === body.name);
//   if (isExist.length !== 0) {
//     return response.status(400).json({
//       error: "name must be unique",
//     });
//   }

//   const Address = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   Address = Address.concat(person);
//   response.json(person);
// });

// router.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   Address = Address.filter((person) => person.id !== id);

//   response.status(204).end();
// });
