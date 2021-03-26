'use strict';
async function getProduct(url)
{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function load()
{
  async function setData(){
    document.querySelector("#sidebar ul").innerHTML = "";
    document.querySelector("#content").innerHTML = "";;
  }
  const productList = await getProduct(`${window.location.href}api`);
  await setData();
  let filter = [];

  //Llenar grilla con productos

  productList.forEach(
      (product) => {
        const HTMLString = productTemplate(product);
        const content = document.querySelector("#content");
        content.innerHTML += HTMLString;
        let category = product.name_category.replace(" ", "_")
        if( filter.indexOf(category) === -1) 
        { 
          filter.push(category)
        }
      }
  );

  //Llenar filtros

  filter.forEach(
    (category)=>{
      const HTMLString = categoryTemplate(category);
      const content = document.querySelector("#sidebar ul");
      content.innerHTML += HTMLString;
    }
  );

  //filtrar categoria

  function hide(elems){
    elems.forEach(item => item.style.display = "none");
  }
  let categorias = document.querySelectorAll('.filtro');
  let productos = document.querySelectorAll('.product-card');
  categorias.forEach(item => item.addEventListener('click', ()=>{
    hide(productos);
    let show_elems = document.querySelectorAll('.'+item.getAttribute('data-category'));
    show_elems.forEach(el => {el.style.display = "block"})
  }));

 //activar buscar
  
  let search = document.querySelectorAll('.search')
  search.forEach(
    item=>{
      item.addEventListener('click', (e)=>{
        showModal();
        let overlay = document.querySelector('.modal-overlay'),
            close = document.querySelectorAll('.close');
        overlay.addEventListener('click', ()=>{
          hideModal();
        })
        close.forEach(item=>{item.addEventListener('click', ()=>{
          hideModal();
        })})
        e.preventDefault();
        return false;
      })
    }
  );

 //Buscador 

  let buscar = document.querySelector('.buscar');
  buscar.addEventListener('click', async  (e)=>{
    let filter = [];
    let product_name = document.querySelector('.product_name');
    const searchList = await getProduct(`${window.location.href}api/${product_name.value}`);
    await setData();


    //Products

    if(searchList.length > 0)
    {
      searchList.forEach(
        (product) => {
          const HTMLString = productTemplate(product);
          const content = document.querySelector("#content");
          content.innerHTML += HTMLString;
          let category = product.name_category.replace(" ", "_")
          if( filter.indexOf(category) === -1) 
          { 
            filter.push(category)
          }
        }
      );
//Llenar filtros

      filter.forEach(
        (category)=>{
          const HTMLString = categoryTemplate(category);
          const content = document.querySelector("#sidebar ul");
          content.innerHTML += HTMLString;
        }
      )
    }
    else{
      const content = document.querySelector("#content");
      content.innerHTML += 'Not found!, try another thing :/';
    }
    hideModal();
    e.preventDefault()
    return false;
  })
}
load();
