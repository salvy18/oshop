import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import { Observable, Subscription } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Categories } from 'src/app/models/categories';
import { ProductService } from 'src/services/product.service';
import { ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Observable<firebase.firestore.QuerySnapshot>;
  categoryList: Categories[] = [];
  serviceSubscription: Subscription;
  categoriesValueChanges$: Observable<unknown[]>;
  serviceSubscriptionValueChanges: Subscription;
  id: string;
  product: Products = {
    id: '',
    title: '',
    category: '',
    price: 0,
    imageUrl: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();
    this.categoriesValueChanges$ = categoryService.getCategoriesValueChanges();


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).pipe(take(1)).subscribe(snapshot => {
        let data = snapshot.data();
        this.product =  {
          id: snapshot.id,
          title: data.title,
          category: data.category,
          price: data.price,
          imageUrl: data.imageUrl
        };
        console.log('Constructor of Product-Form component');
        console.log(data);
        console.log(this.product);
      });
     }
   }




  ngOnInit() {

       this.serviceSubscription = this.categories$.subscribe(querysnapshot => {

          this.categoryList  =  querysnapshot.docs.map(doc => {
          console.log('---On ngOnInit---');
          console.log('QuerySnapShot.Docs');
          console.log(doc);

          var data = doc.data();
          console.log('QuerySnapShot.Data');
          console.log(data);
          return {id: doc.id, name: data.name };  }); // Here i convert the array to an Json Object
          console.log('List');
          console.log(this.categoryList);

      //   console.log(list);
      //   console.log('Entire Observable');
      //   console.log(this.categories$);
      //   console.log('Query Snapshot');
      //   console.log(querysnapshot.docs);
      //   console.log('Looping thru the documents');
      //   querysnapshot.docs.forEach(doc => {
      //   console.log(doc); // snapshot
      //   console.log(doc.id); // snapshot
      //   console.log(doc.data().name);
      //   console.log(doc.data());
      //   this.categoryList.push(doc.data().name);
      //   console.log('list:' + this.categoryList);
      //   console.log(this.categoryList.length);
      // });

    });
      // This will re-construct the observable if DB changes in realtime
      //  this.serviceSubscriptionValueChanges = this.categoriesValueChanges$
      //     .subscribe(val => {
      //       console.log('value Changes');
      //       console.log(val);
      // });
      //  Lets take a look at the differnt methods for the collections
       this.categoryService.collectionRef.valueChanges()
          .subscribe(valueChanges => {
            console.log('value changes');
            console.log(valueChanges);
      });
      // Snapshot Changes
       this.categoryService.collectionRef.snapshotChanges()
          .subscribe(snapshotChanges => {
            const categoriesArray: Categories[] = snapshotChanges.map(snap => {
              return {
                id: snap.payload.doc.id,
                ...snap.payload.doc.data()
              } as Categories;
            });

            console.log('SnapshotChanges');
            console.log(snapshotChanges);
            console.log('Snapshot category array object');
            console.log(categoriesArray);
          });
  }

  save(product) {

    if (this.id) {
      console.log('---Updating---');
      this.productService.update(this.id, product);
    }
    else {
      console.log('----Creating----');
      this.productService.create(product);
    }
    console.log(product);
    this.router.navigate(['admin/admin-products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delele(this.id);
      this.router.navigate(['admin/admin-products']);
    }

  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}

