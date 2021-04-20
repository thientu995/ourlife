import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    worker = new Worker('./error-log.worker', { type: 'module', name: 'error-log' });

    constructor() {
        this.worker.onmessage = ({ data }) => {
            console.log(data);
        };

        window.onerror = (msg: string, url, lineNo, columnNo, error) => {
            let string = msg.toLowerCase();
            let substring = "script error";
            if (string.indexOf(substring) > -1) {
                // console.log("Script Error: See Browser Console for Detail");
            } else {
                this.worker.postMessage({
                    message: msg,
                    url: url,
                    line: lineNo,
                    column: columnNo,
                    error: JSON.parse(JSON.stringify(error))
                });
            }
            return false;
        };
        window.document.addEventListener("error", (event: ErrorEvent) => {
            if (event.target && (event.target as any).src) {
                let url = (event.target as any).src;
                this.worker.postMessage({
                    message: "Resource not found",
                    url: url,
                    error: JSON.parse(JSON.stringify(event))
                });
            } else {
                console.error(event);
                this.worker.postMessage({
                    message: "Unknown error",
                    error: JSON.parse(JSON.stringify(event))
                });
            }
        }, true);
    }

    handleError(error) {
        console.error(error);
        this.worker.postMessage({
            message: "Handler error",
            error: JSON.parse(JSON.stringify(error))
        });
    }
}
