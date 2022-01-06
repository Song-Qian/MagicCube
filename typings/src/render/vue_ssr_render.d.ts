import { Request, Response, NextFunction } from "express";
export default function (templatePath: any, cb: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
