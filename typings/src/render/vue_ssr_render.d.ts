import { Request, Response, NextFunction } from "express";
export default function (root: any, router: any, store: any): (req: Request, res: Response, next: NextFunction) => void;
