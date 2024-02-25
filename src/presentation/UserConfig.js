
export class UserConfig {

    loggedIn = false

    constructor() {
    }

    static fromJSON(json): UserConfig {
        return Object.assign(new UserConfig(), json)
    }

}