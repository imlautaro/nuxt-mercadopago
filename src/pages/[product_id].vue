<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient();

const { data: product } = await useAsyncData(
	`product-${route.params.product_id}`,
	async () => {
		const { data } = await supabase
			.from('products')
			.select('id, name, price, brand:brand_id (name), image_url')
			.eq('id', route.params.product_id)
			.single();
		return data;
	}
);

useHead({
	title: product.value?.name || 'Producto no encontrado | Tienda Azul',
});

const pay = async () => {
	if (!product.value) return;
	const response = await $fetch('/api/mercadopago/create-preference', {
		method: 'post',
		body: {
			id: product.value.id,
			name: product.value.name,
			image_url: product.value.image_url,
			price: product.value.price,
		},
	});

	window.location.replace(response.init_point);
};
</script>

<template>
	<div
		v-if="product"
		items="center"
		class="flex flex-col items-center space-y-6 md:(flex-row space-x-6 space-y-0)"
	>
		<img class="max-h-48" :src="product.image_url" />
		<Stack
			gap="6"
			class="items-center text-center md:(items-start text-start)"
			vertical
		>
			<Stack gap="2" vertical>
				<h1 class="font-medium text-2xl text-center">{{ product.name }}</h1>
				<span class="text-xl">AR$ {{ product.price }}</span>
			</Stack>
			<button
				@click="pay"
				class="bg-primary-600 flex font-medium items-center px-5 py-3 rounded-lg space-x-2 text-white"
			>
				<Icon name="heroicons:credit-card-20-solid" />
				<span>Pagar la compra</span>
			</button>
		</Stack>
	</div>
	<Stack v-else class="text-center" gap="6" vertical>
		<span class="text-4xl">Producto no encontrado - 404</span>
		<NuxtLink class="font-medium text-primary-600" to="/">
			Volver al inicio
		</NuxtLink>
	</Stack>
</template>
