import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditDialogComponent } from './item-edit/item-edit.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  cols = ['name', 'category', 'price', 'actions'];
  items: any[] = [];

  constructor(private dialog: MatDialog, private ApiService: ApiService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.ApiService.getItems().subscribe({
      next: (res) => this.items = res,
      error: (err) => console.error('Error loading items:', err)
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, { width: '420px', data: null });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.ApiService.addItem(res).subscribe({
          next: () => this.loadItems(),
          error: (err) => console.error('Add failed', err)
        });
      }
    });
  }

  editItem(item: any, index: number) {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, { width: '420px', data: { ...item } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.ApiService.updateItem(item.id, res).subscribe({
          next: () => this.loadItems(),
          error: (err) => console.error('Update failed', err)
        });
      }
    });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.ApiService.deleteItem(id).subscribe({
        next: () => this.loadItems(),
        error: (err: any) => console.error('Delete failed', err)
      });
    }
  }
}
