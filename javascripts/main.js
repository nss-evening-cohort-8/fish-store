let discount = .12;

function applySale() {
    $('.on-sale').each(function(i, fish) {
        let fullPrice = $(fish).find('.price');
        let newPrice = parseInt(fullPrice.html()) * (1 - discount);
        fullPrice.html(newPrice.toFixed(2));
    })
}

function writeFishes(fishData) {
    let domstring = '';
    fishData.forEach(fish => { 
        domstring += `<div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
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
    });
    $('#available').append(domstring);
}

function basketEvent() {
    $('.add').on('click', function() {
        let fishToMove = $(event.target).closest('.fish');
        $('#snagged').append(fishToMove);
        $(event.target).text('Remove from Basket').addClass('remove').removeClass('add'); 
        $('.remove').on('click', function() {
            let fishToMove = $(event.target).closest('.fish');
            $('#available').append(fishToMove);
            $(event.target).text('Add to Basket').addClass('add').removeClass('remove');
            basketEvent(); 
        })
    })
   
}

function saleEvent() {
    $('#show-sale').click(function() {
        $('.fish').not('.on-sale').toggle();
        $('#show-sale').text(function(i, text) {
            if(text === 'Show Sale Fish') {
                return 'Show All'
            }
            else {
                return 'Show Sale Fish'
            }
        })
    })
}

$.get('../db/fishes.json')
    .done((data) => {
        writeFishes(data.fishes);
        applySale();
        basketEvent();    
    })
    .fail((error) => {
        console.error(error)
    });  

saleEvent();