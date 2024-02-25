export default class ObservableHelper {

    constructor() {
        this.observableArray = []
    }

    track(observable) {
        this.observableArray.push(observable)
    }

    unTrackAll() {
        this.observableArray.forEach(observable => observable.unsubscribe())
        this.observableArray = []
    }

}