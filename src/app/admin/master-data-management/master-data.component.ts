import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MasterDataService } from './master-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dilog/edit-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-master-data',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTooltipModule,
        FormsModule,
        MatDialogModule,
    ],
    templateUrl: './master-data.component.html',
    styleUrls: ['./master-data.component.scss'],
})
export class MasterDataComponent implements OnInit {
    displayedColumns: string[] = ['select', 'id', 'name', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    selection = new SelectionModel<any>(true, []);
    collectionName: string;
    collectionDisplayName: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private route: ActivatedRoute, private dataService: MasterDataService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const collection = params.get('collection');
            this.collectionName = collection ? collection : '';
            this.collectionDisplayName = this.collectionName.charAt(0).toUpperCase() + this.collectionName.slice(1);
            this.loadData();
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadData() {
        this.dataService.getAll(this.collectionName).subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addItem() {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '250px',
            data: { name: '' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.dataService.add(this.collectionName, { name: result }).then(() => {
                    this.loadData();
                });
            }
        });
    }

    editItem(element: any) {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '250px',
            data: { name: element.name },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.dataService.update(this.collectionName, element.id, { name: result }).then(() => {
                    this.loadData();
                });
            }
        });
    }

    deleteItem(id: string) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.dataService.delete(this.collectionName, id).then(() => {
                this.loadData();
            });
        }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
    }
}
