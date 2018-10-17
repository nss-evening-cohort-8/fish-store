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
        newString += `<div class="${fish.onSale ? 'on-sale' : 'non-sale'} fish card col-md-6 col-md-offset-3">
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
    bindEvents();
    toBasket();
    onSaleButtton();
};

const toggler = () => {
    $(event.currentTarget).toggleClass("add remove");

}

const toBasket = () => {
    $("#main").find(".add").off();
    $("#main").find('.add').on("click", (event) => {
        $("#snagged").append($(event.currentTarget).closest(".fish"));
        toggler();
        $(event.target).text("Remove from Basket")
    })
};

const removeBasket = () => {
    $("#main").find(".remove").off();
    $("#main").find('.remove').on("click", (event) => {
        $("#available").append($(event.currentTarget).closest(".fish"));
        toggler();
        $(event.target).text("Add to Basket");
    })
};

const bindEvents = () => {
    $('body').on("click", () => {
        toBasket();
        removeBasket()
    })
}

const onSaleButtton = () => {
    $("#show-sale").on("click", () => {
        $("#available").children().filter(".non-sale").toggle();
    });
};