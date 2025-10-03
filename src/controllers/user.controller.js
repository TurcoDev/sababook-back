
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
            if (!updatedUser.nombre || !updatedUser.email || !updatedUser.contrasena || !updatedUser.rol_id) {
                return res.status(400).json({ error: "Invalid user data" });
            }
            const result = await userModel.updateUser(userId, updatedUser);
            if (result.affectedRows >0) {
                return res.status(200).json(updatedUser);
            }else{
                return res.status(404).json({ error: `User not found` });
            }
        }catch (error) {
            console.error("Error updating user:", error.message);
            res.status(500).json({ error: "Internal server error"});
        }
   }
   async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            if(!userId) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
            const result = await userModel.deleteUser(userId);
            if (result.affectedRows >0) {
                return res.status(200).end();
            }else{
                return res.status(404).json({ error: `User not found` });
            }
        }catch (error) {
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

