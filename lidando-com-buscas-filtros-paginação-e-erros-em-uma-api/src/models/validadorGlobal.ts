import mongoose from 'mongoose'

const validadorGlobal = mongoose.Schema.Types.String.set('validate', {
	validator: (valor: string) => {
		console.log('valor', valor)
		return valor !== ''
	},
	message: ({ path }: { path: string }) => `O campo ${path} foi fornecido em branco.`,
})

export default validadorGlobal
