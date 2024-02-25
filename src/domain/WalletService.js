import AuthApi from "../api/AuthApi";
import BaseResponse from "../api/base/BaseResponse";
import {RsWallet} from "../data/RsWallet";
import {RsWalletBalance} from "../data/RsWalletBalance";
import WalletApi from "../api/WalletApi";

export default class WalletService {
    static instance = new WalletService()

    getWallets(accountId): Promise<BaseResponse<RsWallet[]>> {
        return WalletApi.instance.getWallets(accountId)
    }

    getBalance(walletId): Promise<BaseResponse<RsWalletBalance>> {
        return WalletApi.instance.getBalance(walletId)
    }

    createWallet(accountId, walletName): Promise<BaseResponse> {
        return WalletApi.instance.createWallet(accountId, walletName)
    }
}