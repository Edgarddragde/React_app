import mongoose from "mongoose"
import userModel from "./user.js"

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => console.log("Mongoose connected successfully"))
    .catch( (error) => console.log(error))



function getUsers(name, job) {
    let promise;
    const query = {};
    if ( name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && job) {
        query.name = name;
        query.job = job;
        return userModel.find(query).exec()
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return userModel.find( {name: name});
}

function findUserByJob(job) {
    return userModel.find( {job: job}  );
}

function findUsers( {name, job} ) {
    const query = {};
    if (name) query.name = name;
    if (job) query.job = job;
    return userModel.find(query).exec();
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id).exec();
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUsers,
    deleteUserById
};