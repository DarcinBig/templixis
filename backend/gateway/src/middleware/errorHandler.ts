import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Gateway Error]:', err)
  res.status(err.status || 500).json({
    err: {
      message: err.message || 'Internal Server Error'
    }
  })
}