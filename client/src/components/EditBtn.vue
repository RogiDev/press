<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on }">
			<v-btn icon small dark color="indigo"
				v-on="on"
				@click="onClick"
			>
				<v-icon dark>
					mdi-pencil
				</v-icon>
			</v-btn>
		</template>
		<span>{{tooltipText}}</span>
	</v-tooltip>
</template>

<script>
	export default {
		name: "edit-btn",
		props: {
			data: {}, tooltipText: {default: "Edit"},
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
