import cloudinary from 'cloudinary';
import axios from 'axios';
import { getId } from '#services/SocketService';

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function subirImg({ request, response }: { request: any, response: any }) {
  const image = request.file('imagen');
  const uploaded = await cloudinary.v2.uploader.upload(image.tmpPath!);
  getId().emit('nueva-imagen', uploaded.secure_url);
  return response.ok({ url: uploaded.secure_url });
}


export async function obtenerImagenes() {
  const response = await axios.get(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
    {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    }
  )

  return response.data.resources
}
