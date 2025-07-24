import { HttpContext } from "@adonisjs/core/http"
import client from "../database/conexion.js"

export class Puntaje {

    async subirPuntaje({ request, response }: HttpContext) {
        const { cantpalabras, correctas, porcentaje, reaccion, nivel } = await request.body()
        try {
            await client.query('insert into puntajes (cantpalabras, correctas, porcentaje, reaccion, nivel) values ($1, $2, $3, $4, $5)', [
                cantpalabras,
                correctas,
                porcentaje,
                reaccion,
                nivel
            ])
           return response.json({ message: 'Puntaje subido exitosamente'})
        } catch (error) {
            return response.json({error:error.message})
        }
    }

    async getPuntajes({ response }: HttpContext) {
        const res = await client.query('SELECT * FROM puntajes ORDER BY porcentaje DESC limit 5')
        return response.json({puntajes:res.rows})
    }
}