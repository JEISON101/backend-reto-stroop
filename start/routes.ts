import { obtenerImagenes, subirImg } from '#controllers/imgController'
import router from '@adonisjs/core/services/router'
import { Puntaje } from '#controllers/PuntajeController'
import { Usuario } from '#controllers/UsuarioController'

const puntaje = new Puntaje()
const user = new Usuario()

router.get('/imgs', obtenerImagenes)
router.post('/img', subirImg)
router.put('set-imagen/:id', user.setImagen)
router.put('get-usuario', user.setImagen)
router.get('/puntajes', puntaje.getPuntajes)
router.post('/puntaje', puntaje.subirPuntaje)
router.post('/login', user.login)
router.post('/register', user.register)