import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {

  constructor(private productService: ProductService,
              private router: Router) {}

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

        const productId: string = route.params.productId;

        return this.productService.verifyProductUser(productId).map(()=>{
            return true;
        }).catch(() => {
            this.router.navigate(['/products']);
            return Observable.of(false);
        });
  }
}