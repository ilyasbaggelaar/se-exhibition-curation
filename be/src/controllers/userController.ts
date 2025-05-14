import { Request, Response } from 'express';
import { fetchUsers } from "../models/userModel"


export const getUsers = (req: Request, res: Response): void => {
    fetchUsers()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        console.error('Error fetching users:', err)
        res.status(500).send({error: 'Failed to fetch users'});
    })
}