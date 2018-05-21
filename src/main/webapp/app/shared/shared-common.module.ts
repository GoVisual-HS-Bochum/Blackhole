import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    BlackholeSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import { DoubleViewComponent } from '../double-view';

@NgModule({
    imports: [
        BlackholeSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent,
        DoubleViewComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        BlackholeSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        DoubleViewComponent
    ]
})
export class BlackholeSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
