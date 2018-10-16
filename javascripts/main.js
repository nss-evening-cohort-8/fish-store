let arrayOfFish = [];

// Filter fish that are "on sale"


$.get("../db/fishes.json")
 .done((data) => {
     writeFish(data.fishes);

 })
 .fail((error) => {
      console.error({error});
  });

// Add fish to "Basket"


// Load fish

const writeFish = (arrayOfFish) => {
    let newString = ``;
    arrayOfFish.forEach((fish)=> {
        newString += `<div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
            <div class="thumbnail">
                <img src="${fish.imageSoure}"
                    alt="" width="40%">
            <div class="caption">
                <h3 id="thumbnail-label">${fish.name}</h3>
                <p>$
                    <span class="price">${fish.basePrice}</span>
                </p>
            </div>
                <div class="caption card-footer">
                    <button class="add btn btn-danger">Add To Basket</button>
                </div>
            </div>
        </div>`;
    })
    $("#available").append(newString);
    addRemoveEvent();
};

const addRemoveEvent = () => {
    $("#main").find('.add').on("click", (event) => {
        $(event.currentTarget).closest(".fish").hide();
    })
}