import { InjectionKey } from '@nuxtjs/composition-api';
import { Client } from './client';

export const VILLUS_CLIENT: InjectionKey<Client> = Symbol('villus.client');
