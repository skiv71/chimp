<template>
    <div>
        <p v-text="hello"></p>
        <test-component/>
    </div>
</template>

<style scoped>
    p {
        font-size: 30px;
    }
</style>

<script>
    import { test as testComponent } from '../component'
    import { events, session } from '../service'

    export default (() => {

        var components = { testComponent }

        return {
            components,
            data() {
                return {
                    state: ''
                }
            },
            created() {
                var state = session.get('state')
                if (!state.name)
                    state.name = 'view/main'
                setTimeout(() => {
                    state.name = 'Jolly Rodger'
                    events.$emit('name', state.name)
                }, 3000)
                this.state = state
            },
            computed: {
                hello() {
                    var { name } = this.state
                    return `Hello, ${name}`
                }
            },
            methods: {
            }
        }
    })() 
</script>