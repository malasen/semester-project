
export function productCard(product, productContainer){
   
        productContainer.innerHTML ="";

        for(let i = 0; i < product.length; i++){

            if(!product[i].image_url && !product[i].image.url){
                continue;
            }
            
            let imageUrl = `<img src="${product[i].image_url}" style="height: 240px; object-fit : cover" 
                                 class="card-img-top" alt="${product[i].image_url}" />`
            if(!product[i].image_url){
                imageUrl = `<img src="../public/${product[i].image.url}" style="height: 240px; object-fit : cover" 
                                 class="card-img-top" alt="${product[i].image.alternativeText}" />`;
            }

           productContainer.innerHTML+= 

           `<div class="col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
                <div class="card my-2">
                    ${imageUrl}
                    <div class="card-body">
                        <h5 class="card-title">${product[i].title}</h5>
                        <p class="card-text">$${product[i].price}</p>
                        <a href="../html/product-detail.html?id=${product[i].id}" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>`;
        }
    };

  


