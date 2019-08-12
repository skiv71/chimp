<template>
    <div>
        <p v-text="test"></p>
    </div>
</template>

<style scoped>
    p {
        color: blue;
    }
</style>

<script>
    import { events, session } from '../service'
    
    export default (() => {

        return {
            data() {
                return {
                    state: ''
                }
            },
            created() {
                var { name } = this
                var state = session.get('state')
                if (!state.name)
                    state.name = 'view/test'
                this.state = state
                this.events = { name: name.bind(this) }
                events.watch(this.events, this._uid) 
            },
            destroyed() {
                events.unwatch(this.events, this._uid)
            },
            computed: {
                test() {
                    var { name } = this.state
                    return `testing, ${name}`
                }
            },
            methods: {
                name(e) {
                    console.log('name event')
                    console.log(e)
                }

            }
        }
    })()
</script>