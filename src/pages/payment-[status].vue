<script setup lang="ts">
const route = useRoute();

const message = computed(() => {
	switch (route.params.status) {
		case 'pending':
			return 'El pago está pendiente';
		case 'success':
			return 'El pago se ha realizado correctamente';
		case 'failure':
		default:
			return 'El pago ha sido rechazado o no ha finalizado';
	}
});

const icon = computed(() => {
	switch (route.params.status) {
		case 'pending':
			return 'heroicons:clock-solid';
		case 'success':
			return 'heroicons:check-circle-solid';
		case 'failure':
		default:
			return 'heroicons:x-circle-solid';
	}
});

const color = computed(() => {
	switch (route.params.status) {
		case 'pending':
			return 'text-orange-600';
		case 'success':
			return 'text-green-600';
		case 'failure':
		default:
			return 'text-red-600';
	}
});
</script>

<template>
	<Stack class="text-center" gap="6" vertical>
		<Icon class="mx-auto text-4xl" :class="color" :name="icon" />
		<span class="text-4xl">
			{{ message }}
		</span>
		<Stack class="p-6" gap="4" vertical>
			<Stack v-if="$route.query.payment_method_id" gap="2" vertical>
				<span class="text-sm text-gray-600">Payment Method ID: </span>
				<span>{{ $route.query.payment_method_id }}</span>
			</Stack>
			<Stack v-if="$route.query.external_reference" gap="2" vertical>
				<span class="text-sm text-gray-600">External Reference: </span>
				<span>{{ $route.query.external_reference }}</span>
			</Stack>
			<Stack v-if="$route.query.collection_id" gap="2" vertical>
				<span class="text-sm text-gray-600">Payment ID: </span>
				<span>{{ $route.query.collection_id }}</span>
			</Stack>
		</Stack>
		<NuxtLink class="font-medium text-primary-600" to="/">
			Volver al inicio
		</NuxtLink>
	</Stack>
</template>
