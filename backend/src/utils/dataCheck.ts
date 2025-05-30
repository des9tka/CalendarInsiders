import { Request, Response } from "express"

const bodyRequestHandler = (req: Request, res: Response): boolean => {
    if (!req.body) {
        res.status(400).json({ error: "Request body is required." });
        return false;
    }
    return true;
};

export { bodyRequestHandler }

