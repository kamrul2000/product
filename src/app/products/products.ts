import { Component, OnInit } from '@angular/core';
import { ProductService,Product } from '../product-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  productForm: FormGroup;

  constructor(private service: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = true;
    this.service.getProducts().subscribe({
      next: (data) => { this.products = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load products'; this.loading = false; }
    });
  }

  addOrUpdate() {
    if (this.productForm.valid) {
      const p = this.productForm.value;
      if (p.id === 0) {
        p.id = this.products.length + 1;
        this.service.addProduct(p).subscribe(
          (data: any) => { 
            this.products.push(data);
            console.log(data);
          },
          () => { this.error = 'Failed to load products'; }
        );
      } else {
        const index = this.products.findIndex(x => x.id === p.id);
        this.service.updateproduct(p).subscribe(
          (data: any) => { 
            this.products[index]=data;
            console.log(data);
          },
          () => { this.error = 'Failed to load products'; }
        )
      }
      this.productForm.reset({ id: 0, name: '', description: '' });
    }
  }

  edit(product: Product) {
    this.productForm.setValue(product);
  }

  delete(product: Product) {
    this.service.deleteProduct(product.id).subscribe(
      (data:any )=> { 
            this.products= this.products.filter(p => p.id !== product.id);
            console.log(data);
          },
          () => { this.error = 'Failed to load products'; }
    )
  }
}
