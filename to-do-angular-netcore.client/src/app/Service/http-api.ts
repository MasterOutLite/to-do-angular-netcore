import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "./http-config";
import {UserService} from "./user.service";
import queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class HttpApi {

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  get<T>(url: string, queryObg?: any) {
    const query = '?' + queryString.stringify(queryObg, {skipNull: true, skipEmptyString: true})
    const options = {
      headers: {"Authorization": `Bearer ${this.userService.getToken()}`}
    };

    return this.httpClient.get<T>(apiUrl + url + query, options);
  }

  post<T>(url: string, body: any) {
    const options = {
      headers: {"Authorization": `Bearer ${this.userService.getToken()}`}
    };
    return this.httpClient.post<T>(apiUrl + url, body, options);
  }

  put<T>(url: string, body: any) {
    const options = {
      headers: {
        "Authorization": `Bearer ${this.userService.getToken()}`
      }
    };
    return this.httpClient.put<T>(apiUrl + url, body, options);
  }

  delete<T>(url: string) {
    const options = {
      headers: {"Authorization": `Bearer ${this.userService.getToken()}`}
    };
    return this.httpClient.delete<T>(apiUrl + url, options);
  }
}
