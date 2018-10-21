// Filter fish that are "on sale"
$('#show-sale').click(() => {
    //all of the divs with the class fish, give me just the ones without the class 'on-sale'
    $(".fish").not(".on-sale").toggle() //toggle hides and shows
    $("#show-sale").text((i, text) => {
        if (text === "Show Sale Fish"){
            return "Show All Fish";
        } else {
            return "Show Sale Fish";
        }
        // return (text === "Show Sale Fish") ? "Show All Fish" : "Show Sale Fish"
    })
})

const discount = .12;

const applySale = () => {
    $(".on-sale").each((i, fish) => {
        const fullPrice = $(fish).find(".price");
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        fullPrice.html(newPrice);
    })
}

// Add fish to "Basket"


const writeFishes = (arrayOfFishes) => {
    let domString = '';
    arrayOfFishes.forEach((fish) => {
        domString +=  
        `<div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
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
    </div>`
    })
    // Write to the available div
    $("#available").append(domString);
    bindEvents();
}

// This is also acceptable.
// $('body').on('click', 'button.add', () => {
// })

const bindEvents = () => {  
    $(".add").on('click', (e) => {
        // what is the div that has the fish
        const fishToMove = $(e.target).closest('.fish');
        // move it to the 'snagged' div
        $("#snagged").append(fishToMove);
        // button text => Remove from Basket | change class -"add" +"remove"
        $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
        // Remove functionality
        $('.remove').on('click', (e) => {
            const fishToRemove = $(e.target).closest('.fish');
            $('#available').append(fishToRemove);
            $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
        });    
    });
        
}


//Load fish
$.get('../db/fishes.json')
 .done((data) => {
 writeFishes(data.fishes);
 applySale();
})
.fail((error) => {
    console.error(error)
});

// Remove fish
  
// Dynamically listen for events that happen on buttons with a class of add
$('body').on('click', 'button.add', (e) => {
  // what is the div that has the fish
  const fishToMove = $(e.target).closest('.fish');
  // move it to the 'snagged' div
  $("#snagged").append(fishToMove);
  // button text => Remove from Basket | change class - 'add' + 'remove'
  $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
})

$('body').on('click', 'button.remove', (e) => {
  const fishToMove = $(e.target).closest('.fish');
    $("#available").append(fishToMove);
    $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
  })


  

  

