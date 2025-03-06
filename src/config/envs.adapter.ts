import 'dotenv/config';
import { get } from 'env-var';

export const envsAdapter = {

    PORT: get('PORT').required().asPortNumber(),

}