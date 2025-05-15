import { Request, Response } from 'express';
import { fetchUsers, userById } from "../models/userModel"


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

export const getUserID = (req: Request, res: Response): void => {
    userById(req.params.id)
    .then((user) => {
        res.status(200).json(user);
    })
    .catch((err) => {
        console.error('Error fetching specific user', err)
        res.status(500).send({error: 'Failed to fetch user'});
    })
}