import { Request, Response, NextFunction } from "express";
import {ResourceType} from "../types/Resource.type";


/**
   GET /header
 */
export const getHeader = async (req: Request, res: Response) => {
    console.log('getHeader');
    const resource = new ResourceType('https://www.lexpress.fr/', '<header[\\s\\S]+?</header>', []);
    const header = await resource.getResource();
    res.status(200).json({
        header: header,
    });
}