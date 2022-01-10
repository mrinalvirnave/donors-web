import { Component, OnInit } from '@angular/core';
import { Donor } from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  donor: Donor = {
    name: '',
    email: '',
    pledge: 200,
    phone: ''
  };
  submitted = false;

  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
  }

  saveDonor(): void {
    const data = {
      name: this.donor.name,
      email: this.donor.email,
      pledge: this.donor.pledge,
      phone: this.donor.phone
    };

    this.donorService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDonor(): void {
    this.submitted = false;
    this.donor = {
      name: '',
      email: '',
      pledge: 200,
      phone: ''
    };
  }

}
