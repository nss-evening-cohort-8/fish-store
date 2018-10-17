// Filter fish that are "on sale"
const writeFishes = (arrayOfFishes) => {
    let domString = '';
    arrayOfFishes.forEach((fish) => {
        domString += `<div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
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
        //write to the available div
        $("#available").append(domString);
        // $(domString).appendTo("#available");
        AddEvents();
    }
$("#show-sale").click(() => {
// grab all of the divs with the class fish, give me just the onces WITHOUT the class 'on-sale' and HIDE
$(".fish").not(".on-sale").toggle(); //toggle hides and shows the fishes 
})
    const AddEvents = () => {
        $(".add").on('click',(e) => {

            // what is the div that has the fish
           const fishToMove = $(e.target).closest('.fish');
            // move it to the 'snagged' div 
            $("#snagged").append(fishToMove);
            //button text => Remove from basket | change class - 'add' + 'remove'
            $(e.target).text('Remove From Basket').addClass('remove').removeClass('add');
            removeEvent();
        })
        
    }
    const removeEvent = () =>{
        $(".remove").on('click', (e) => {            
            const fishToMove = $(e.target).closest('.fish');
            $("#available").append(fishToMove);
            $(e.target).text('Add To Basket').addClass('add').removeClass('remove');     
            AddEvents();  
        })
    }
   

    //dynamically listen for events that hpapen on buttons with a class
// $('body').on('click', 'button.add',() => {
    // $(".add").on('click',(e) => {

        // what is the div that has the fish
    //    const fishToMove = $(e.target).closest('.fish');
        // move it to the 'snagged' div 
        // $("#snagged").append(fishToMove);
        //button text => Remove from basket | change class - 'add' + 'remove'
        // $(e.target).text('Remove From Basket').addClass('remove').removeClass('add');
// })

// $('body').on('click', 'button.remove',() => {
    // console.log('click');
    // const fishToRemove = $(e.target).closest('.fish');
    // $("#available").append(fishToRemove);
    // $(e.target).text('Add To Basket').addClass('add').removeClass('remove');  
    // }

    $.get('../db/fishes.json')
    .done((data) => {
        console.log(data);
        writeFishes(data.fishes);
    })
    .fail((error) => {
        console.error(error);
    })
 