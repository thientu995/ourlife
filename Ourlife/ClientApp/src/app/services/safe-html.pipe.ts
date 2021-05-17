import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) { }

    transform(value: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) { }

    transform(value: string): SafeHtml {
        if(value.indexOf('/') == 0){
        }
        else{
            var url = new URL(value);
            url.searchParams.append('ngsw-bypass', 'true');
            value = url.toString();
        }
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}