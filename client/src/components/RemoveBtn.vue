<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on }">
			<v-btn icon small dark color="red"
				v-on="on"
				@click="onClick"
			>
				<v-icon dark>
					mdi-delete
				</v-icon>
			</v-btn>
		</template>
		<span>{{tooltipText}}</span>
	</v-tooltip>
</template>

<script>
	export default {
		name: "remove-btn",
		props: {
			data: {}, tooltipText: {default: "Delete"},
		},
		components: {},
		data() {
			return {};
		},
		computed: {},
		methods: {
			onClick() {
				this.$emit("click", this.data);
			}
		},

	};
</script>

<style scoped>

</style>
