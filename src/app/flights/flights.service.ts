import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class FlightsService {
    private url = environment.base_api_url + 'flights';

    constructor(private http: HttpClient) {
    }

    getFly(origin: string, destination: string, badge: string): any {
        return this.http.get(this.url + '/' + origin + '/' + destination + '/' + badge);
    }
}