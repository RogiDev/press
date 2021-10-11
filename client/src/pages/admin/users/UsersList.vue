<template>
 	<div>
		<v-select chips outlined label="Users" :items="options" v-model="user" item-text="firstName" item-value="_id"/>
	</div>
</template>

<script>
	export default {
		name: "user-select",
		props: {value: {default: null}},
		components: {},
        computed: {
            options(){
                return this.$store.state.Users.users;
            },
            user: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit("input", val);
				}
			}
        },
	};
</script>

<style>

</style>