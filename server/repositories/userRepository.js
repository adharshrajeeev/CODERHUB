import User from "../model/users.js";


export const fetchAllUsers = async () => {
    try {

        const users = await User.find()
        return { data: users }

    } catch (err) {
        
        return { error: err.message };
    }
}