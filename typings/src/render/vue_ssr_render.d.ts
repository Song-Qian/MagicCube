import { Request, Response, NextFunction } from "express";
export default function (path: any, render: any): (req: Request, res: Response, next: NextFunction) => void;
