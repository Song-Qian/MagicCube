import { Request, Response, NextFunction } from "express";
export default function (templatePath: any, render: any): (req: Request, res: Response, next: NextFunction) => void;
