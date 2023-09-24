const rootDiv = document.getElementById("root");
const badge = document.getElementById("badge");
const modalBody = document.querySelector(".modal-body");
const total = document.getElementById("total");
const input = document.getElementById("input");
const select = document.getElementById("select");
const modal = document.querySelector(".modal")


let korzinka = []

// Input search
input.addEventListener("input", () => {
  let sortedProducts = products.filter((v) =>
    v.title.toLowerCase().includes(input.value.toLowerCase())
  );
  render(sortedProducts);
});

// Select search
select.addEventListener("input", () => {
  let sortedProducts = products.filter(
    (v) => v.category.toLowerCase() === select.value.toLowerCase()
  );
  render(sortedProducts);
});

// Select ichiga categoryga qarab option yasash
function createOption() {
  let categorys = products.map((value) => {
    return value.category;
  });

  let singleCategory = new Set([...categorys]);

  singleCategory.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category.slice(0, 1).toUpperCase() + category.slice(1);

    select.append(option);
  });
}

// Html ga cardlarni chiqazish
function render(data) {
  let result = "";
  data.forEach((product) => {
    result += `
        <div class="card" style="width: 18rem">
          <div class="card-img">
            <img class="card-image" src="${product.image}" alt="${product.title
      }" />
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.title.length > 20
        ? product.title.slice(0, 20) + "..."
        : product.title
      }</h5>
            <p class="card-text">
              ${product.description.length > 50
        ? product.description.slice(0, 50) + "..."
        : product.description
      }
            </p>
            <div class="d-flex justify-content-between align-items-center"> 
              <span class="h3 text-success" style="margin-bottom: 0">$${product.price
      }</span>
              <button onclick="addToBag(${product.id - 1
      })"  class="btn btn-success">➕</button>
            </div>
          </div>
        </div>
        `;
  });

  rootDiv.innerHTML = result;
}


function deleteProduct(ind) {
  count -= korzinka[ind].price;
  korzinka.splice(ind, 1)
  badge.textContent = korzinka.length;
  korzinkaRender();
  total.textContent = count.toFixed(2);
  if (korzinka.length === 0) {
    modalBody.innerHTML = `<img
                style="width: 100%"
                src="./assets/empty_shoppin_bag_4x.webp"
                alt=""
              />`
  }
}

// Korzinkaga tanlangan productlarni chiqazish
function korzinkaRender() {
  modalBody.innerHTML = ""
  let res = "";
  korzinka?.forEach((v, ind) => {
    res += `
    <div id="productDetail" class="d-flex align-items-center justify-content-between my-2">
        <div class="d-flex align-items-center gap-4">
          <img width="70" src="${v.image}"/>

  
            <div>
              <h4 class="korzinkaTitle">${v.title}</h4>
              <h2 class="korzinkaTitle text-success">$${v.price}</h2> 
            </div>
          </div>

        <img onclick="deleteProduct(${ind})" width="40" src="./assets/trash-bin.png" alt="delete icon"/>
      </div>
    `;

    modalBody.innerHTML = res;
  });
}

let count = 0;

// Korzinkaga qoshish
function addToBag(idsi) {
  if (korzinka.find((v) => v.title === products[idsi].title)) {
    alert("This product is already in bag!");
  } else {
    korzinka = [...korzinka, ...products.slice(idsi, idsi + 1)]
    badge.textContent = korzinka.length;
    korzinkaRender();
    count += products[idsi].price;
    total.textContent = count.toFixed(2);
  }
}
render(products);
createOption();
