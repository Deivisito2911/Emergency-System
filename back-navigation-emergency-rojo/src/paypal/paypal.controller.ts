import { Controller, Get, Query} from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
    constructor(private readonly solicitud: PaypalService){
    }
    
    @Get()
    crearOrden() {
        this.solicitud.crearOrden();
        return 'orden creada <3';
    }

    @Get('capturarOrden')
    capturarOrden(@Query() query) {
        this.solicitud.capturarOrden(query.token);
        return 'orden capturada <3';
    }
}