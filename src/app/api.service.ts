import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // rootURI = 'https://entryleveljobs.me/api/jobs';
  getJobTypes() {
    return this.http.get('/api/type').pipe((res) => {
      return res;
    });
  }
  getJobCategories() {
    return this.http.get('/api/category').pipe((res) => {
      return res;
    });
  }
  getJobs(query: any) {
    //take limit and offset from query and add to query string
    let limit = (query?.limit ? query.limit : 10) + 1;
    let offset = query?.page ? (query.page - 1) * 10 : 0;
    let queryString = '?limit=' + limit + '&offset=' + offset;
    //add job type to query string
    // console.log(query);
    queryString += '&type=' + (query.type ? query.type : '');
    //add job category to query string
    queryString += '&category=' + (query.category ? query.category : '');
    // console.log(queryString);
    return this.http.get('/api' + queryString);
  }
}
