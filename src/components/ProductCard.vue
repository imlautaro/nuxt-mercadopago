<script setup lang="ts">
defineProps<{ id: number; image_url: string; name: string; price: number }>();
</script>

<template>
	<Stack
		class="border overflow-hidden p-6 rounded-2xl text-center"
		gap="6"
		vertical
	>
		<img class="max-h-48 mx-auto" :src="image_url" />
		<Stack items="center" gap="4" vertical>
			<Stack vertical>
				<span class="font-medium">{{ name }}</span>
				<span>AR$ {{ price }}</span>
			</Stack>
			<NuxtLink
				class="bg-primary-600 font-medium px-5 py-3 text-white rounded-lg"
				:to="`/${id}`"
			>
				Comprar
			</NuxtLink>
		</Stack>
	</Stack>
</template>
