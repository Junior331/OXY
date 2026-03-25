import { Router } from 'express'
import { verifyToken } from '../../middleware/authMiddleware'
import {
  listPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
  getClientPacientes,
} from './pacienteController'

const router = Router()

// Apply auth middleware to all routes
router.use(verifyToken)

// GET /pacientes - List all pacientes
router.get('/', listPacientes)

// GET /pacientes/client/:clientId/pacientes - Get pacientes for a client (DEVE VIR ANTES DE :pacienteId)
router.get('/client/:clientId/pacientes', getClientPacientes)

// POST /pacientes - Create new paciente
router.post('/', createPaciente)

// GET /pacientes/:pacienteId - Get paciente details (rotas genéricas após específicas)
router.get('/:pacienteId', getPaciente)

// PUT /pacientes/:pacienteId - Update paciente
router.put('/:pacienteId', updatePaciente)

// DELETE /pacientes/:pacienteId - Delete paciente
router.delete('/:pacienteId', deletePaciente)

export default router

