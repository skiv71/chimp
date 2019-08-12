var _map = new Map()

class Events {

    static _map(e) {
        return _map.get(e) || _map.set(e, new Map()).get(e) 
    }
    
    static $emit(event, data) {
        var map = Events._map(event)
        for (var callback of map.values()) {
            callback(data)
        }
        return Events
    }

    static $off(event, id) {
        var map = Events._map(event)
        if (!map.delete(id))
            throw new Error(`No callback for event: ${event}, id: ${id}!`)
        return Events
    }

    static $on(event, id, callback) {
        var map = Events._map(event)
        if (map.get(id))
            throw new Error(`Duplicate event callback, id: ${id}!`)
        map.set(id, callback)
        return Events
    }

    static unwatch(events, id) {
        for (var event in events) {
            Events.$off(event, id)
        }
        return Events
    }

    static watch(events, id) {
        for (var event in events) {
            Events.$on(event, id, events[event])
        }
        return Events
    }

}

export default Events