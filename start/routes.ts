import { obtenerImagenes, subirImg } from '#controllers/imgController'
import router from '@adonisjs/core/services/router'
import { Puntaje } from '#controllers/PuntajeController'
import { authMiddleware, Usuario } from '#controllers/UsuarioController'

const puntaje = new Puntaje()
const user = new Usuario()

router.get('/imgs', obtenerImagenes).middleware([authMiddleware])
router.post('/img', subirImg).middleware([authMiddleware])
router.get('/puntajes', puntaje.getPuntajes).middleware([authMiddleware])
router.post('/puntaje', puntaje.subirPuntaje).middleware([authMiddleware])
router.post('/login', user.login)
router.post('/register', user.register)