import { serverMercadopagoClient } from '#mercadopago/server';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig();
	const mercadopago = serverMercadopagoClient(event);

	const body = await readBody(event);

	let preference: CreatePreferencePayload = {
		auto_return: 'approved',
		items: [
			{
				id: `000${body.id}`,
				title: body.name,
				description: 'Dispositivo móvil de Tienda e-commerce',
				picture_url: body.image_url,
				unit_price: body.price,
				quantity: 1,
			},
		],
		back_urls: {
			success: `${runtimeConfig.public.baseUrl}/payment-success`,
			pending: `${runtimeConfig.public.baseUrl}/payment-pending`,
			failure: `${runtimeConfig.public.baseUrl}/payment-failure`,
		},
		external_reference: 'dev.lautaropereyra@gmail.com',
		payer: {
			name: 'Lalo',
			surname: 'Landa',
			email: 'test_user_36961754@testuser.com',
			phone: {
				area_code: '11',
				// @ts-ignore
				number: 12345678,
			},
			address: {
				street_name: 'calle falsa',
				street_number: 123,
				zip_code: '1663',
			},
		},
		payment_methods: {
			installments: 6,
			excluded_payment_methods: [{ id: 'Visa' }],
		},
		notification_url: `${runtimeConfig.public.baseUrl}/api/mercadopago/webhooks`,
	};

	try {
		const response = await mercadopago.preferences.create(preference);
		return response.body;
	} catch (err) {
		console.log(err);
		throw 'Error';
	}
});
