<template>
	<section class="section-layouts">
		<div class="section-row section-cards">
			<LayoutsWidths />
		</div>

		<Separator />

		<div class="section-row">
			<LayoutsToggles />
		</div>
	</section>
</template>

<script setup>
import LayoutsToggles from './Toggles.vue'
import LayoutsWidths from './Widths.vue'

import Separator from '@/components/Separator.vue'
</script>
