import { Component, Input, OnInit } from '@angular/core';
import { DonorService } from 'src/app/services/donor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Donor } from 'src/app/models/donor.model';

@Component({
  selector: 'app-donor-detail',
  templateUrl: './donor-detail.component.html',
  styleUrls: ['./donor-detail.component.css']
})
export class DonorDetailComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentDonor: Donor = {
    name: '',
    email: '',
    pledge: 0,
    phone: ''
  };
  message = '';

  constructor(
    private donorService: DonorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDonor(this.route.snapshot.params["id"]);
    }
  }

  getDonor(id: string): void {
    this.donorService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDonor = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     name: this.currentDonor.name,
  //     email: this.currentDonor.email,
  //     pledge: this.currentDonor.pledge,
  //     phone: this.currentDonor.phone
  //   };

  //   this.message = '';

  //   this.donorService.update(this.currentDonor.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentDonor.published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  updateDonor(): void {
    const data = {
      name: this.currentDonor.name,
      email: this.currentDonor.email,
      pledge: this.currentDonor.pledge,
      phone: this.currentDonor.phone
    };
    this.message = '';

    this.donorService.update(this.currentDonor._id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res?.message ? res.message : 'This donor was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteDonor(): void {
    this.donorService.delete(this.currentDonor._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/donors']);
        },
        error: (e) => console.error(e)
      });
  }

}

