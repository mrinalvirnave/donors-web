import { Component, OnInit } from '@angular/core';
import { Donor } from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';


@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {

  donors?: Donor[];
  currentDonor: Donor = {};
  currentIndex = -1;
  email = '';

  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
    this.retrieveDonors();
  }

  retrieveDonors(): void {
    this.donorService.getAll()
      .subscribe({
        next: (data) => {
          this.donors = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDonors();
    this.currentDonor = {};
    this.currentIndex = -1;
  }

  setActiveDonor(donor: Donor, index: number): void {
    this.currentDonor = donor;
    this.currentIndex = index;
  }

  removeAllDonors(): void {
    this.donorService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchEmail(): void {
    this.currentDonor = {};
    this.currentIndex = -1;

    this.donorService.findByEmail(this.email)
      .subscribe({
        next: (data) => {
          this.donors = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}