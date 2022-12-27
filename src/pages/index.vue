<script setup lang="ts">
useHead({
	title: 'Tienda Azul',
});

const supabase = useSupabaseClient();

const { data: products } = await useAsyncData('products', async () => {
	const { data } = await supabase
		.from('products')
		.select('id, name, price, brand:brand_id (name), image_url');
	return data;
});
</script>

<template>
	<Stack gap="12" vertical>
		<h1 class="text-4xl text-center">Smartphones</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<ProductCard v-for="product in products" v-bind="product" />
		</div>
	</Stack>
</template>
