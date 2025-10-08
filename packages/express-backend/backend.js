// backend.js
import express from "express";
import cors from "cors";

const app = express()
const port = 8000;
const users = {
    users_list: [
	{
	    id: "xyz789",
	    name: "Charlie",
	    job: "Janitor"
	},
	{
	    id: "abc123",
	    name:"Mac",
	    job: "Bouncer",
	},
	{
	    id: "ppp222",
	    name: "Mac",
	    job: "Professor",
	},
	{
	    id: "yat999",
	    name: "Dee",
	    job: "Aspiring actress"
	},
	{
	    id: "zap555",
	    name: "Dennis",
	    job: "Bartender"
	}
    ]
};


    
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

// user filter because may return a list
const findUserByName = (name) =>
    users["users_list"].filter((user) => user["name"] === name);

// user filter because may be more than one
const findUserByJob = (job) =>
    users["users_list"].filter((user) => user["job"] === job); 
const findUserById = (id) => 
    users["users_list"].find((user) => user["id"] === id);
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! this is the new change!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
	let result = findUserByName(name);
	result = { users_list: result };
	res.send(result);
    } else {
	res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if ( result === undefined ) {
	res.status(404).send("Resource not found.");
    } else {
	res.send(result);
    }
});

app.get("/users/name/gi:name", (req, res) => {
    const user = req.params["name"]; //or req.params.id
    let result = findUserByName(user);
    if ( result === undefined ) {
	res.status(404).send("Resource not found.");
    } else {
	res.send(result);
    }
});

app.get("/users/job/:job", (req, res) => {
    const job = req.params["job"]; //or req.params.id
    let result = findUserByJob(job);
    if ( result === undefined ) {
	res.status(404).send("Resource not found.");
    } else {
	res.send(result);
    }
});

app.delete("/users/id/:id", (req, res) => {
	const id = req.params["id"];
	const index = users["users_list"].findIndex((user) => user["id"] == id)
	if (index == -1) {
		res.status(401)
	} else {
		users["users_list"].splice(index, 1)
		res.status(200)

	}
})

app.post("/users/name/:name", (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();

});



app.listen(port, () => {
    console.log(
	'Example app listening at http://localhost:${port}'
    );
});
