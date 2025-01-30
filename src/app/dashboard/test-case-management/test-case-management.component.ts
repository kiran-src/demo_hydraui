import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TestManagementService, TestCase, PaginatedResponse } from './test-management-service.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test-case-management',
  templateUrl: './test-case-management.component.html',
  styleUrls: ['./test-case-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class TestCaseManagementComponent implements OnInit {
  testCases: TestCase[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  testCaseForm: FormGroup;
  editingTestCase: TestCase | null = null;
  isSyncing: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private testManagementService: TestManagementService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.testCaseForm = this.formBuilder.group({
      description: ['', Validators.required],
      scenario: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTestCases();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.currentPage = 0;
      this.loadTestCases();
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  loadTestCases() {
    this.testManagementService.getTestCases(this.currentPage, this.pageSize, this.searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response: PaginatedResponse<TestCase>) => {
          this.testCases = response.content;
          this.totalElements = response.totalElements;
        },
        error => this.showError('Failed to load test cases')
      );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTestCases();
  }

  onSubmit() {
    if (this.testCaseForm.valid) {
      const testCase = this.testCaseForm.value;
      if (this.editingTestCase) {
        this.updateTestCase(this.editingTestCase.id, testCase);
      } else {
        this.createTestCase(testCase);
      }
    }
  }

  createTestCase(testCase: Partial<TestCase>) {
    this.testManagementService.createTestCase(testCase)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        createdTestCase => {
          this.testCases.unshift(createdTestCase);
          this.resetForm();
          this.showSuccess('Test case created successfully');
        },
        error => this.showError('Failed to create test case')
      );
  }

  updateTestCase(id: number, testCase: Partial<TestCase>) {
    this.testManagementService.updateTestCase(id, testCase)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        updatedTestCase => {
          const index = this.testCases.findIndex(tc => tc.id === id);
          if (index !== -1) {
            this.testCases[index] = updatedTestCase;
          }
          this.resetForm();
          this.showSuccess('Test case updated successfully');
        },
        error => this.showError('Failed to update test case')
      );
  }

  editTestCase(testCase: TestCase) {
    this.editingTestCase = testCase;
    this.testCaseForm.patchValue(testCase);
  }

  deleteTestCase(id: number) {
    if (confirm('Are you sure you want to delete this test case?')) {
      this.testManagementService.deleteTestCase(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.testCases = this.testCases.filter(tc => tc.id !== id);
            this.showSuccess('Test case deleted successfully');
          },
          error => this.showError('Failed to delete test case')
        );
    }
  }

  syncTestCases() {
    this.isSyncing = true;
    this.testManagementService.syncTestCases()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.loadTestCases();
          this.showSuccess('Test cases synced successfully');
          this.isSyncing = false;
        },
        error => {
          this.showError('Failed to sync test cases');
          this.isSyncing = false;
        }
      );
  }

  resetForm() {
    this.testCaseForm.reset();
    this.editingTestCase = null;
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}