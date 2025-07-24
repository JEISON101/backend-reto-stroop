import { obtenerImagenes, subirImg } from '#controllers/imgController'
import router from '@adonisjs/core/services/router'

router.get('/imgs', obtenerImagenes)
router.post('/img', subirImg)
