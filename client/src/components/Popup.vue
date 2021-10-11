<template>
	<v-dialog v-bind="$attrs" v-model="openModal" :max-width="width">
		<v-card>
			<v-toolbar color="primary">
				<v-btn icon dark @click="openModal = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-toolbar-title>
					<slot name="header"></slot>
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<slot name="toolbar-action"/>
			</v-toolbar>
			<v-card-title>

			</v-card-title>
			<v-card-text>
				<slot></slot>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<slot name="action"></slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: {value: {}, width: {default: 600}},
		components: {},
		data() {
			return {};
		},
		computed: {
			openModal: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit("input", val);
				}
			}
		}
	};
</script>

<style scoped>

</style>
