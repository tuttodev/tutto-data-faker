
import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'

const route = Router()

route.use('/users', userRoutes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
