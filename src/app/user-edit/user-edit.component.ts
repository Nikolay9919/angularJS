import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() userData:any = { login: '', type: '', site_admin:false };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getUser(this.route.snapshot.params['login']).subscribe((data: {}) => {
      console.log(data);
      this.userData = data;
    });
  }

  updateUser() {
    this.rest.updateUser(this.route.snapshot.params['login'], this.userData).subscribe((result) => {
      this.router.navigate(['/user-details/'+result.login]);
    }, (err) => {
      console.log(err);
    });
  }

}
