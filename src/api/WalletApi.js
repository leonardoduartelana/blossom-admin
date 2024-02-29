import BaseRequest from "./base/BaseRequest";

export default class WalletApi {
    static instance = new WalletApi()

    // eslint-disable-next-line class-methods-use-this
    getBalance(walletId) {
        return new BaseRequest().executeRequest(
            `/api/v1/wallets/${walletId}/balance`,
            'GET'
        )
    }

}