import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url="http://localhost:3000/aruk/"
  private gyumiSub = new BehaviorSubject(null)
  constructor(private http:HttpClient) {
    this.loadGyumi()
   }

  loadGyumi(){
    this.http.get(this.url).subscribe(
      (res:any)=>this.gyumiSub.next(res)
    )
  }

  getGyumik(){
    return this.gyumiSub
  }

  getGyumi(id:any){
    return this.http.get(this.url+id)
  }

  updateGyumi(gyumi:any){
    this.http.put(this.url+gyumi.id, gyumi).forEach(
      ()=>this.loadGyumi()
    )
  }
  deleteGyumi(gyumi:any){
    this.http.delete(this.url+gyumi.id).forEach(
      ()=>this.loadGyumi()
    )
  }
  postGyumi(gyumi:any){
    this.http.post(this.url,gyumi).forEach(
      ()=>this.loadGyumi()
    )
  }


}
