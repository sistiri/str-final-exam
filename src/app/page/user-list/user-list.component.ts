import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();

  // user: User = new User;

  phrase: string = '';

  key: string = 'id';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDelete(user: User): void {
    if (confirm("Are you sure you want to delete the item?")){
      this.userService.remove(user).subscribe( () => {
          this.userService.getAll();
        }
      );
      // ;
    }

  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  setSorter(param: string): void {
    this.key = param;
  }

  onSubmit(user: User): void {

    if (user.id !== 0) {
      this.userService.update(user);
      this.userService.getAll();
      this.router.navigate(['/']);

    } else {
      this.userService.create(user);
      this.userService.getAll();
      this.router.navigate(['/']);

    }
  }

}
