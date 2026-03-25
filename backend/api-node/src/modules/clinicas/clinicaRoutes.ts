import { Router } from 'express'
import { verifyToken } from '../../middleware/authMiddleware'
import {
  listClinicas,
  getClinica,
  createClinica,
  updateClinica,
  getClinicaInfo,
} from './petshopController'

const router = Router()

// GET /petshops - List all petshops (public)
router.get('/', listClinicas)

// GET /petshops/info/company - Get authenticated company's clinica info (DEVE VIR ANTES DE :id)
router.get('/info/company', verifyToken, getClinicaInfo)

// POST /petshops - Create new clinica (requires auth)
router.post('/', verifyToken, createClinica)

// GET /petshops/:clinicaId - Get clinica details
router.get('/:clinicaId', getClinica)

// PATCH /petshops/:clinicaId - Update clinica (requires auth)
router.patch('/:clinicaId', verifyToken, updateClinica)

export default router

