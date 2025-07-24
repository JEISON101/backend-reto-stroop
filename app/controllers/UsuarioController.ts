import * as bcrypt from 'bcryptjs'
import client from '../database/conexion.js'
import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

export class Usuario {
  async register({ request, response }: HttpContext) {
    const { nombre, email, password } = await request.body()
    const passEncriptada = await bcrypt.hash(password, 10)
    try {
      await client.query('insert into usuarios (nombre, email, password) values ($1, $2, $3)', [
        nombre,
        email,
        passEncriptada,
      ])
      return response.send({ message: 'Usuario registrado' })
    } catch (error) {
      return response.send({ message: 'Error al registrar el usuario' })
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()
    const res = await client.query(`SELECT * FROM usuarios WHERE email = $1`, [email])

    if (res.rows.length === 0) {
      return response.status(404).json({ mensaje: 'No hay usuarios registrados con este correo' })
    }

    const user = res.rows[0]
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return response.status(401).json({ mensaje: 'CREDENCIALES INCORRECTAS', valid: false })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      },
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '4h' }
    )    

    return response.json({
      valid: true,
      token: token,
      usuario: user,
    })
  }
}

export async function authMiddleware(ctx: HttpContext, next: () => Promise<void>) {
  const authHeader = ctx.request.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ctx.response.status(401).json({ mensaje: 'Token no proporcionado' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta')
    ctx.request.updateBody({ usuario: decoded })
  } catch (err) {
    return ctx.response.status(403).json({ mensaje: 'Token inválido o expirado' })
  }
}

