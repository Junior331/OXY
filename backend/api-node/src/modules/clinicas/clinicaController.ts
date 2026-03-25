import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { attachBusinessHoursToClinicaJson } from '../../lib/businessHoursTable'

// GET /clinicas - List all clinicas
export async function listClinicas(req: Request, res: Response) {
  try {
    const { skip = 0, limit = 50, is_active } = req.query
    const where: any = {}
    if (is_active !== undefined) where.isActive = is_active === 'true'

    const clinicas = await prisma.clinicaProfile.findMany({
      where,
      skip: parseInt(skip as string),
      take: parseInt(limit as string),
      include: { company: true },
      orderBy: { createdAt: 'desc' },
    })

    const withHours = await Promise.all(clinicas.map((p) => attachBusinessHoursToClinicaJson(p)))
    res.json(withHours)
  } catch (error) {
    console.error('Error listing clinicas:', error)
    res.status(500).json({ error: 'Failed to list clinicas' })
  }
}

// GET /clinicas/:clinicaId
export async function getClinica(req: Request, res: Response) {
  try {
    const { clinicaId } = req.params
    const clinica = await prisma.clinicaProfile.findUnique({
      where: { id: parseInt(clinicaId as any) },
      include: { company: true },
    })
    if (!clinica) return res.status(404).json({ error: 'Clínica not found' })
    res.json(await attachBusinessHoursToClinicaJson(clinica))
  } catch (error) {
    console.error('Error getting clinica:', error)
    res.status(500).json({ error: 'Failed to get clinica' })
  }
}

// POST /clinicas
export async function createClinica(req: Request, res: Response) {
  try {
    const { company_id, address, cep, phone, latitude, longitude, owner_phone, emergency_contact, assistant_name } = req.body
    if (!company_id || !phone) return res.status(400).json({ error: 'company_id and phone are required' })

    const existing = await prisma.clinicaProfile.findUnique({ where: { companyId: company_id } })
    if (existing) return res.status(409).json({ error: 'Clínica already exists for this company' })

    const clinica = await prisma.clinicaProfile.create({
      data: {
        companyId: company_id,
        address,
        cep,
        phone,
        latitude,
        longitude,
        ownerPhone: owner_phone,
        emergencyContact: emergency_contact,
        assistantName: assistant_name,
        isActive: true,
      },
      include: { company: true },
    })

    res.status(201).json(await attachBusinessHoursToClinicaJson(clinica))
  } catch (error) {
    console.error('Error creating clinica:', error)
    res.status(500).json({ error: 'Failed to create clinica' })
  }
}

// PATCH /clinicas/:clinicaId
export async function updateClinica(req: Request, res: Response) {
  try {
    const { clinicaId } = req.params
    const { address, cep, phone, latitude, longitude, owner_phone, emergency_contact, assistant_name, company_name, is_active } = req.body

    const existing = await prisma.clinicaProfile.findUnique({ where: { id: parseInt(clinicaId as any) } })
    if (!existing) return res.status(404).json({ error: 'Clínica not found' })

    if (company_name !== undefined) {
      await prisma.saasCompany.update({ where: { id: existing.companyId }, data: { name: company_name } })
    }

    const data: any = {}
    if (address !== undefined) data.address = address
    if (cep !== undefined) data.cep = cep
    if (phone !== undefined) data.phone = phone
    if (latitude !== undefined) data.latitude = latitude
    if (longitude !== undefined) data.longitude = longitude
    if (owner_phone !== undefined) data.ownerPhone = owner_phone
    if (emergency_contact !== undefined) data.emergencyContact = emergency_contact
    if (assistant_name !== undefined) data.assistantName = assistant_name
    if (is_active !== undefined) data.isActive = is_active

    const clinica = await prisma.clinicaProfile.update({
      where: { id: parseInt(clinicaId as any) },
      data,
      include: { company: true },
    })

    res.json(await attachBusinessHoursToClinicaJson(clinica))
  } catch (error) {
    console.error('Error updating clinica:', error)
    res.status(500).json({ error: 'Failed to update clinica' })
  }
}

// GET /clinicas/info/company
export async function getClinicaInfo(req: Request, res: Response) {
  try {
    const companyId = req.user!.companyId
    const clinica = await prisma.clinicaProfile.findUnique({
      where: { companyId },
      include: { company: true },
    })
    if (!clinica) return res.status(404).json({ error: 'Clínica not found' })
    res.json(await attachBusinessHoursToClinicaJson(clinica))
  } catch (error) {
    console.error('Error getting clinica info:', error)
    res.status(500).json({ error: 'Failed to get clinica info' })
  }
}
