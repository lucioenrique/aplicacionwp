import { createBot, createFlow, MemoryDB, createProvider } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

/*const flowBienvenida = addKeyword('')
*/

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const message = body.message
        const phone = req.body.phone

        await bot.sendMessage(phone, message, {})
        res.end('enviado')
    }))
    await createBot({
        flow: createFlow([]),
        database: new MemoryDB(),
        provider
    })
}

main()