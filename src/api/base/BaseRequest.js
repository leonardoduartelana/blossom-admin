import {getUserToken} from "../../presentation/login/Firebase";
import BaseResponse from "./BaseResponse";
import {useNavigate} from "react-router";
import RequestError from "./RequestError";
import ResponseCode from "../../data/ResponseCode";

export default class BaseRequest {

    constructor(props) {
        this.props = props
    }

    LOCAL_SERVER = "http://127.0.0.1:5000"
    PROD_SERVER = "https://api.blossombodyworks.co.nz"
    SERVER_URL = this.LOCAL_SERVER

    addHeaders(authenticated, requestOptions = {}): Promise {
        if (requestOptions.headers == null) {
            requestOptions.headers = {}
        }

        if (!(requestOptions.body instanceof FormData)) {
            requestOptions.headers['Content-Type'] = 'application/json'
        }

        if (!authenticated) {
            return new Promise(((resolve, reject) => resolve(requestOptions)))
        } else {
            return getUserToken().then((token) => {
                if (requestOptions.headers == null) {
                    requestOptions.headers = {}
                }

                requestOptions.headers['Authorization'] = 'Bearer ' + token
                return requestOptions
            }).catch(error => {
                throw error
            })
        }
    }

    executeRequest(url, method, body, authenticated = true): Promise {
        const requestOptions = {
            method: method
        };

        console.log('Executing: ' + url)

        let finalURL = this.SERVER_URL + url;

        if (body) {
            if (method === 'GET') {
                finalURL = finalURL + '?' + new URLSearchParams(body)
            } else {
                if (body instanceof FormData) {
                    requestOptions.body = body
                } else {
                    requestOptions.body = JSON.stringify(body)
                }
            }
        }

        return this.addHeaders(authenticated, requestOptions).then((requestOptions) => {
            return fetch(finalURL, requestOptions)
                .then(async (result) => {
                    console.log('Response for: ' + url)
                    console.log(result)
                    if (result.code === '500')
                        return new BaseResponse(null, null, null, "INTERNAL_SERVER_ERROR")

                    let json
                    try {
                        json = await result.json()
                    } catch (e) {
                        console.log('Error parsing body of ' + url + ' | ' + e)
                    }
                    console.log(json)
                    return new BaseResponse(json.status, ResponseCode.fromCode(json.code), json.data, null)
                }, (error) => {
                    return new BaseResponse(null, null, null, error)
                })
        })
    }

}