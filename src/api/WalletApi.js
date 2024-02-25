import BaseResponse from "./base/BaseResponse";
import BaseRequest from "./base/BaseRequest";
import {RsWallet} from "../data/RsWallet";
import {RsWalletBalance} from "../data/RsWalletBalance";

export default class WalletApi {
    static instance = new WalletApi()

    getWallets(accountId): Promise<BaseResponse<RsWallet[]>> {
        return new BaseRequest().executeRequest(
            '/api/v1/wallets',
            'GET',
            {
                accountId: accountId
            }
        )
    }

    getBalance(walletId): Promise<BaseResponse<RsWalletBalance>> {
        return new BaseRequest().executeRequest(
            '/api/v1/wallets/' + walletId + '/balance',
            'GET'
        )
    }

    createWallet(accountId, walletName) {
        return new BaseRequest().executeRequest(
            '/api/v1/wallets',
            'POST',
            {
                accountId: accountId,
                name: walletName
            }
        )
    }
}