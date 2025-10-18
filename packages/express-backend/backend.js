// backend.js
import express, { json } from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express()
const port = 8000;

app.use(cors())
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello World! this is the new change!");
});

app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	userServices.getUsers(name, job)
		.then( (doc) =>  {
			if (!doc) return res.status(404).send("Resource not found");
			res.send({users_list: doc});
		})
		.catch( (error) => {
			console.error(error);
			res.status(500).send("A error ocurred on the server.");
		});
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.findUserById(id)
		.then((doc) => {
			if (!doc) return res.status(404).send("Resource not Found.");
			res.send(doc)
		})
		.catch( (error) => {
			console.error(error);
			res.status(500).send("An error ocurred on the server")
		})
});

app.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	userServices.deleteUserById(id)
		.then( (doc) => {
			if (!doc) return res.status(404).send("Not Successful");
			res.status(204).send(doc);
		})
		.catch( (error) => {
			console.error(error);
			res.status(500).send("An error ocurred on the server");
		})
})

app.post("/users", (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
	userServices.addUser(req.body)
		.then( (doc) => {
			if (!doc) return res.status(400).send("Could not add resource");
			res.send(doc);
		})
		.catch( (error) => {
			console.error(error)
			res.status(500).send("An error ocurred on the server");
		})

});




app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

