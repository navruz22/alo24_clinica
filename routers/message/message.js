const axios = require('axios');
const config = require("config")
const { Product } = require('../../models/Warehouse/Product')
const { Clinica } = require('../../models/DirectorAndClinica/Clinica')
require('../../models/Services/Department')
const { User } = require('../../models/Users')
const {
    OnlineClient,
    validateOnlineClient,
} = require('../../models/OnlineClient/OnlineClient')



const handleSend = async (number, message) => {
    axios.get(`https://smsapp.uz/new/services/send.php?key=${config.get('smsKey')}&number=${number}&message=${message}`)
        .then(res => {
            console.log('ok');
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}




module.exports.sendMessage = async () => {
    const onlineclients = await OnlineClient.find({
        brondate: {
            $gte: new Date()
        }
    })
        .select("-__v -isArchive -updatedAt")
        .populate('clinica', "name")
        .populate('department', "name")
        .lean()

    console.log(onlineclients);

    for (const client of onlineclients) {
        const { phone, firstname, lastname, department, clinica, brondate } = client;
        const { name: deparmtent_name } = department;
        const { name: clinica_name } = clinica

        handleSend(`998${phone}`, `Xuramtli ${firstname} ${lastname}! Eslatib o'tamiz, siz ${new Date(brondate).toLocaleDateString('ru-RU')} kuni, soat ${new Date(brondate).toLocaleTimeString('ru-RU')} da ${clinica_name} ning ${deparmtent_name} bo'limiga qabulga yozilgansiz! Iltimos kech qolmang! Ma'lumot uchun: +998992234244`)
    }
}
