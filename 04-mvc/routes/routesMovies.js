/* eslint-disable space-before-function-paren */
import { Router } from 'express'
// createRequire crea un requiere para poder usar el json sin necesidad de parsearlo
// import { createRequire } from 'node:module'

import { movieController } from '../controller/movieController.js'

export const moviesRouter = Router()

moviesRouter.get('/', movieController.getAll)

moviesRouter.get('/:id', movieController.getById)

moviesRouter.post('/', movieController.create)

moviesRouter.patch('/:id', movieController.update)

moviesRouter.delete('/:id', movieController.delete)
