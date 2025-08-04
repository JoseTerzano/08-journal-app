import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dvalwljzu',
    api_key: '695662966229339',
    api_secret: 'nsFdYiEUhZbJd0YQ4y4Vyc7DsRA',
    secure: true
});

describe('Pruebas en fileUpload()', () => {

    test('debe de subir el archivo correctamente a Cloudinary', async () => {

        const imageUrl = 'https://t4.ftcdn.net/jpg/01/62/69/25/360_F_162692511_SidIKVCDnt5UKHPNqpCb2MSKvfBlx1lG.jpg'
        // Imagen que saque de google copiando el Url para el Test
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'imagen.jpg')

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // console.log('url👉', url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');

        await cloudinary.api.delete_resources([imageId]);

    });

    test('debe de retornar null', async() => {

        const file = new File([], 'imagen.jpg')

        const url = await fileUpload(file);

        expect( url ).toBe( null );


    })




})