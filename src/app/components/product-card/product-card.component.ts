import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag/shopping-bag.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  @Input('showActions') showActions;
  user;
  isLiked: boolean;
  quantity = 0;

  constructor(
    private authService: AuthService,
    private bagService: ShoppingBagService
  ) { 
    authService.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })

    /**
     * Aqui hay que inicializar la variable isLiked, donde 
     * se busca en la base de datos si el producto se encuentra en la
     * wishlist
     * Si se encuentra, isLiked = true
     * Si no se encuentra, isLiked = false
     */
  }

  ngOnInit(): void {
  }

  addToBag(product){
    this.bagService.addToBag(product, this.user);
    this.quantity += 50;
  }

  removeFromBag(product){
    this.bagService.removeFromBag(product, this.user);
    this.quantity -= 50;
  }

  like(){
    this.isLiked = !this.isLiked;
    /**
     * Aqui se agrega la llamada a la bd
     * Si isLiked == true, entonces agregar a wishlist
     * Si isLiked == false, entonces eliminar de wishlist
     */
  }

}
