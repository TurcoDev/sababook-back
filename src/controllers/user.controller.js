
import { userModel } from "../models/user.model.js";

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error getting users:", error.message);
            res.status(500).json({ error: "Database connection not established" });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = req.body;
            if(!newUser.nombre || !newUser.email || !newUser.contrasena || !newUser.rol_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await userModel.createUser(newUser);
        res.status(201).json(result);

        }catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({ error: "Database connection not established" });
        }
   
    }
    async updateUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const updatedUser = req.body;
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            const result = await userModel.updateUser(userId, updatedUser);
            return res.status(200).json(result);
        }catch (error) {
            const errorMessage = error.message;

        if (errorMessage.includes("not found")) {
            return res.status(404).json({ error: errorMessage });
        }
        if (errorMessage.includes("No data provided")) {
            return res.status(400).json({ error: errorMessage });
        }
        console.error("Error updating user:", errorMessage);
        return res.status(500).json({ error: "Internal server error: Failed to process update." });
        }
   }
   async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            if(!userId) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
            await userModel.deleteUser(userId);         
            return res.status(204).end();
           
            }
        catch (error) {
            console.error("Error deleting user:", error.message);
            res.status(500).json({ error: "Internal server error"});
        }
   }
    async getUserById(req, res) {
          try {
            const userId = parseInt(req.params.id, 10);
            if (!userId) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
            const user = await userModel.getUserById(userId);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ error: `User not found` });
            }
        }catch (error) {
            console.error("Error getting user by ID:", error.message);
            res.status(500).json({ error: "Internal server error" }); 
        }  
    }

}

export default new UserController();