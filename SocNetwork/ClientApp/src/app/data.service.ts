import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Tag } from './tag';
 
@Injectable()
export class DataService {
 
    private url = "/api/user";
 
    constructor(private http: HttpClient) {
    }
 
    getProducts() {
        return this.http.get(this.url);
    }
}
