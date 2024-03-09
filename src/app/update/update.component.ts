import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  oszlopok=[
    {key:"id", text:"#", type:"plain"},
    {key:"megnevezes", text:"Megnevezés", type:"text"},
    {key:"mennyiseg", text:"Mennyiség(kg)", type:"number"},
    {key:"lejar", text:"Lejárati idő", type:"date"},
  ]
  gyumi:any={}
  id:any=null
  constructor(private base:BaseService, private router:Router, private aroute:ActivatedRoute)
  {
    this.aroute.paramMap.subscribe(
      (params)=>{
        this.id=params.get('id')
        // console.log(this.id)
        if (this.id)
        this.base.getGyumi(this.id).subscribe(
          (res)=>this.gyumi=res
        )
      }
    )
  }

  hozzaadas(){
    if (!this.id) this.base.postGyumi(this.gyumi)
    else this.base.updateGyumi(this.gyumi)
    this.gyumi={}
    this.router.navigate(['/list'])
  }
}
