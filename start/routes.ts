import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/upload', async({request, response}:HttpContext) => {
  const img = request.file('imagen',{
    size:'5mb',
    extnames:['jpg', 'png', 'jpeg', 'webp']
  })

  if(!img){
    return response.json({mjs:'No se envió ningun archivo'})
  }
})
