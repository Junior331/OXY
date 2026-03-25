import { Router } from 'express'
import { verifyToken } from '../../middleware/authMiddleware'
import {
  listClinicas,
  getClinica,
  createClinica,
  updateClinica,
  getClinicaInfo,
} from './clinicaController'

const router = Router()

// GET /clinicas - List all clinicas (public)
router.get('/', listClinicas)

// GET /clinicas/info/company - Get authenticated company's clinica info (DEVE VIR ANTES DE :id)
router.get('/info/company', verifyToken, getClinicaInfo)

// POST /clinicas - Create new clinica (requires auth)
router.post('/', verifyToken, createClinica)

// GET /clinicas/:clinicaId - Get clinica details
router.get('/:clinicaId', getClinica)

// PATCH /clinicas/:clinicaId - Update clinica (requires auth)
router.patch('/:clinicaId', verifyToken, updateClinica)

export default router

