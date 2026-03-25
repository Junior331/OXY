import { Router } from 'express'
import { verifyToken } from '../../middleware/authMiddleware'
import {
  listPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  getClientPets,
} from './pacienteontroller'

const router = Router()

// Apply auth middleware to all routes
router.use(verifyToken)

// GET /pacientes - List all pacientes
router.get('/', listPets)

// GET /pacientes/client/:clientId/pacientes - Get pacientes for a client (DEVE VIR ANTES DE :paciented)
router.get('/client/:clientId/pacientes', getClientPets)

// POST /pacientes - Create new paciente
router.post('/', createPet)

// GET /pacientes/:paciented - Get paciente details (rotas genéricas após específicas)
router.get('/:paciented', getPet)

// PUT /pacientes/:paciented - Update paciente
router.put('/:paciented', updatePet)

// DELETE /pacientes/:paciented - Delete paciente
router.delete('/:paciented', deletePet)

export default router

