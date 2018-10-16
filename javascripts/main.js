// Filter fish that are "on sale"
$("#main").find('.add').on("click", (event) => {
    $(event.currentTarget).closest(".fish").hide();
})
// Add fish to "Basket"