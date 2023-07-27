import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jobFilter';
  public types: [] = [];
  public categories: [] = [];
  public jobs: [] = [];
  public hasNextPage: boolean = false;
  public hasPreviousPage: boolean = false;
  loading = false;
  filterForm = this.formBuilder.group({
    type: '',
    category: '',
    page: 1,
  });
  constructor(
    private ApiService: ApiService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.ApiService.getJobTypes().subscribe((data: any) => {
      // console.log(data);
      this.types = data.data;
    });
    this.ApiService.getJobCategories().subscribe((data: any) => {
      // console.log(data);
      this.categories = data.data;
    });
    this.getJobs();
  }
  getJobs() {
    this.loading = true;
    this.ApiService.getJobs(this.filterForm.value).subscribe((data: any) => {
      this.jobs = data.data.slice(0, 10);
      this.hasNextPage = data.data.length > 10;
      this.hasPreviousPage = this.filterForm.value.page
        ? this.filterForm.value.page > 1
        : false;
      this.loading = false;
    });
  }
  onPageChange() {
    this.getJobs();
  }
  onFilterChange() {
    this.filterForm.patchValue({ page: 1 });
    this.getJobs();
  }
}
