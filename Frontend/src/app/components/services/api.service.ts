import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  getfoodlist(){
    return this.http.get(this.baseUrl + '/foodlist')
  }
  getcheflist(){
    return this.http.get(this.baseUrl + '/cheflist')
  }
  saveorder(data : any){
    return this.http.post(this.baseUrl + '/orderinfo', data)
  }
  getordercheflist(name : any){
    let params = new HttpParams()
    params = params.append('id', name)
    return this.http.get(this.baseUrl + '/getcheforder', { params: params })
  }
  getchefhistorylist(name : any){
    let params = new HttpParams()
    params = params.append('id', name)
    return this.http.get(this.baseUrl + '/getcheforderhistory', { params: params })
  }
  updateorderstatuschef(billnumber : any){
    let params = new HttpParams()
    params = params.append('billnumber', billnumber)
    return this.http.get(this.baseUrl + '/updatestatuschef', { params: params })
  }
  updateorderstatuspaid(billnumber : any){
    let params = new HttpParams()
    params = params.append('billnumber', billnumber)
    return this.http.get(this.baseUrl + '/updatestatuspaid', { params: params })
  }
  updatechef(data : any){
    return this.http.post(this.baseUrl + '/updatechef', data)
  }
  updatechefwithpassword(data : any){
    return this.http.post(this.baseUrl + '/updatechefwithpassword', data)
  }
  updatemanagement(data : any){
    return this.http.post(this.baseUrl + '/updatemanagement', data)
  }
  updatemanagementwithpassword(data : any){
    return this.http.post(this.baseUrl + '/updatemanagementwithpassword', data)
  }
  getdetailsfromchefname(chefname : any){
    let params = new HttpParams()
    params = params.append('chefname', chefname)
    return this.http.get(this.baseUrl + '/chefname', { params: params })
  }
  updateorderstatuspaidcombined(billnumber : any){
    return this.http.post(this.baseUrl + '/updatestatuspaidcombinebill', billnumber)
  }
  getallinfo(){
    return this.http.get(this.baseUrl+'/allinfo')
  }
  getallchef(){
    return this.http.get(this.baseUrl+'/getallchefdata')
  }
  getallmanagement(){
    return this.http.get(this.baseUrl+'/getallmanagementdata')
  }
  getallstock(){
    return this.http.get(this.baseUrl+'/getallstockdata')
  }
  getallcurrentorder(mobile : any){
    let params = new HttpParams()
    params = params.append('mobile', mobile)
    return this.http.get(this.baseUrl+'/allcurrentorder', { params: params })
  }
  addchef(data : any){
    return this.http.post(this.baseUrl + '/addchef', data)
  }
  addmanagement(data : any){
    return this.http.post(this.baseUrl + '/addmanagement', data)
  }
  addstock(data : any){
    return this.http.post(this.baseUrl + '/addstock', data)
  }
  loginmanagement(data:any){
    return this.http.post(this.baseUrl + '/loginmanagement', data)
  }
  getmanagementdetail(username:any){
    let params = new HttpParams()
    params = params.append('username', username)
    return this.http.get(this.baseUrl + '/managementdata', { params: params })
  }
  generatedsinglebill(billnumber : any){
    let params = new HttpParams()
    params = params.append('billnumber', billnumber)
    return this.http.get(this.baseUrl + '/generatedsinglebill', { params: params })
  }
  generatedcompletebill(billnumber : any){
    let params = new HttpParams()
    params = params.append('billnumber', billnumber)
    return this.http.get(this.baseUrl + '/generatedcompletebill', { params: params })
  }
  getstockdetails(id : any){
    let params = new HttpParams()
    params = params.append('id', id)
    return this.http.get(this.baseUrl + '/getstockdetails', { params: params })
  }
  putstock(data : any){
    return this.http.post(this.baseUrl + '/putstock', data)
  }
}
