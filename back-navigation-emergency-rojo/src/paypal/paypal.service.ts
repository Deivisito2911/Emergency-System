import { Injectable, Dependencies } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
@Dependencies(HttpService)
export class PaypalService {
    constructor(private readonly httpService: HttpService){}

    async solicitarToken() {
        const params = new URLSearchParams('https://api-m.sandbox.paypal.com/v1/oauth2/token');
        params.append('grant_type','client_credentials');

        const token: AxiosResponse<{access_token: string}> = await this.httpService.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',params,{
            auth: {
                username: 'AfVi_ekgOQlnT9pbKXHz5ce7_X0bImNcnaYebu-50hMn7GXuz6o9wwdzHFgK4yysvLH6OGdxyrl0mlT_', 
                password: 'EJFH5tla4RrQGU4E_rYa5pWRqG4V20OAl9_1NoMwwfPosOeGwMBRuMI6Ah9-XlWypbOCIbMECTLXWdqn',
            }
        }).toPromise();
        //esas claves no deben quedar expuestas xd
        return token.data.access_token;
    }

    async crearOrden(){
        
        const orden = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '50'
                    }
                }
            ],
            application_context: {
                brand_name: 'Embarcación',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: 'http://localhost:3063/api/paypal/capturarOrden',

            }
        }
        const token = await this.solicitarToken();
        const respuesta: AxiosResponse<{data: object}> = await this.httpService.post('https://api-m.sandbox.paypal.com/v2/checkout/orders',orden,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).toPromise();

        console.log(respuesta.data);
    }

    async capturarOrden(id) {
        const token = await this.solicitarToken();
        const respuesta: AxiosResponse<object> = await this.httpService.post('https://api-m.sandbox.paypal.com/v2/checkout/orders/'+id+'/capture',{},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).toPromise();

        console.log(respuesta.data);
    }
}