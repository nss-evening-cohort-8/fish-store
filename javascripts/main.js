// Filter fish that are "on sale"
$("#main").find('.add').on("click", (event) => {
    $(event.currentTarget).closest(".fish").hide();
})

$.get("../db/fishes.json")
 .done((data) => {
     console.log(data);
 })
 .fail((error) => {
      console.error({error});
  });

// Add fish to "Basket"