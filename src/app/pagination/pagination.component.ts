import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() hasNextPage: any;
  @Input() hasPreviousPage: any;
  @Input() filterForm: any;
  @Output() onPageChange = new EventEmitter();
  constructor() {}
  nextPage() {
    this.filterForm.patchValue({ page: this.filterForm.value.page + 1 });
    this.onPageChange.emit();
  }
  previousPage() {
    this.filterForm.patchValue({ page: this.filterForm.value.page - 1 });
    this.onPageChange.emit();
  }
}
