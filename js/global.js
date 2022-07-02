(function( $ ){

    $(document).ready( function() {
        customSelectBox();
        datepicker();
        addapply();
        subMenu();
        addsubMenu();
        var timepickerFrom = new TimePicker(["#timeFrom","#timeTo", "#timeDelivery", "#timeready"], {
            lang: 'en',
            theme: 'dark'
          }); 

          timepickerFrom.on('change', function(evt) {
            
            var value = (evt.hour || '00') + ':' + (evt.minute || '00');
            evt.element.value = value; 
          
          });

        $(".your-reference").on("change", function(){
            var val = $(this).val();
            if(val.search("\\n")>0) {
                result=val.split('\n');
                console.log(result);
                $(this).parents(".bonds-field").find("b").text(result.length);
            } else {
                if ($.trim(val).length>0) {
                    $(this).parents(".bonds-field").find("b").text(1);
                } else {
                    $(this).parents(".bonds-field").find("b").text(0);
                }
            }
            
        });
        
    });
    
    // Cusom select box to style
    function customSelectBox() {
        // Iterate over each select element
        $('select').each(function () {
            // Cache the number of options
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden'); // Hides the select element
            $this.wrap('<div class="custom-select-wrap"></div>'); // Wrap the select element in a div
            $this.after('<div class="custom-select"></div>'); // Insert a styled div to sit over the top of the hidden select element
            let $custom_select = $this.next('div.custom-select'); // Cache the styled div
            $custom_select.text($this.children('option').eq(0).text()); // Show the first select option in the styled div

            // Insert an unordered list after the styled div and also cache the list
            let $list = $('<ul />', { 'class': 'options' }).insertAfter($custom_select);
            // Insert a list item into the unordered list for each select option
            for (let i = 0; i < numberOfOptions; i++) {
                let $rel_val = $this.children('option').eq(i).val();
                let $opts_cl = (i == 0) ? "selected" : "";
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $rel_val,
                    class: $opts_cl
                }).appendTo($list);
            }
            // Cache the list items
            let $listItems = $list.children('li');
            // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
            $custom_select.click(function (e) {
                e.stopPropagation();
                if(!$(this).hasClass('active')){
                    $('div.custom-select.active').each(function () {
                        $(this).removeClass('active').next('ul.options').hide();
                    });
                }
                $(this).toggleClass('active').next('ul.options').toggle();
            });
            // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
            // Updates the select element to have the value of the equivalent option
            $listItems.click(function (e) {
                e.stopPropagation();
                $custom_select.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel')).change();
                $list.children('li').removeClass('selected');
                $(this).addClass('selected');
                $list.hide();
                /* alert($this.val()); Uncomment this for demonstration! */
            });
            // Hides the unordered list when clicking outside of it
            $(document).click(function () {
                $custom_select.removeClass('active');
                $list.hide();
            });

        });
    }
    

    function datepicker(){
        $('.datepicker').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            calendarWeeks : true,
            clearBtn: true,
            disableTouchKeyboard: true
        });
        $('.datepicker-2').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            calendarWeeks : true,
            clearBtn: true,
            disableTouchKeyboard: true
        });

      
        
         
    }

    function addapply () {
         // add to job
         $("#add-to-job").on("click", function(){
            var wrapper = $(".add-apply-wrapper");
            var count = wrapper.data("count");
            var newCount = count+1;
            wrapper.data("count", newCount);

            var html = '<div class="manage-apply">' +
            '<div class="title-leg">' +  
                '<p>Leg Number '+ newCount +':</p>' +
                '<div class="col-two-field">' +
                    '<div class="bonds-field bonds-field-description">' +
                        '<select class="js-example-basic-single pickup"'+
                         'name="pickup">' +
                            '<option value="TL">Pickup</option>' +
                            '<option value="AL">Alabama</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<p class="subtitle-two">Service Level:</p>' +
                '<div class="col-two-field">' +
                    '<div class="bonds-field bonds-field-description">' +
                        '<select class="js-example-basic-single pickup"'+
                         'name="pickup">' +
                            '<option value="STD">STD</option>' +
                            '<option value="AL">Alabama</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Bonds Store</label>' +
                    '<select class="bonds-manage-store-select select-hidden"' +
                        'name="bond-store">' +
                        '<option value="men" selected>Menzies IM - Menzies Imports</option>' +
                        '<option value="min">Menzies IM</option>' +
                        '<option value="mmp">Menzies Imports</option>' +
                    '</select>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Items</label>' +
                    '<input type="text" name="item" required>' +
                '</div>' +
            '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Address Book</label>' +
                    '<select class="bonds-address-book-select select-hidden"' +
                        'name="aBook">' +
                        '<option value="pod" selected>POD</option>' +
                        '<option value="pickedup">Picked up</option>' +
                        '<option value="delay">Driver Delay</option>' +
                        '<option value="confirm">Confirm Job Booking</option>' +
                    '</select>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Weight</label>' +
                    '<input type="text" name="weight" required>' +
                '</div>' +
            '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Company</label>' +
                    '<input type="text" name="company" required>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>No. of Pallets</label>' +
                    '<select class="bonds-pallets-select select-hidden"' +
                        'name="pallets">' +
                        '<option value="1" selected>1</option>' +
                        '<option value="2">2</option>' +
                        '<option value="3">3</option>' +
                        '<option value="4">4</option>' +  
                    '</select>' +
                '</div>' +
            '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Street Address</label>' +
                    '<input type="text" name="address" required>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Cubic Metres</label>' +
                    '<input type="number" name="metres" required>' +
                '</div>' +
          '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Suburb / Town</label>' +
                    '<input type="text" name="town" required>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>References for this leg</label>' +
                    '<textarea  class="leg-reference-2"' +
                     'cols="1"' +
                     'rows="8"' +
                      'name="leg-reference-2"' +
                      'required></textarea>' +
                    '<small><b>0</b> lines entered. Max 20 characters per line</small>' +
                '</div>' +
            '</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Contact / Phone</label>' +
                    '<input type="text" name="ct-phone" required>' +
                '</div>' +
                '<div class="bonds-field col-12 col-sm-6">' +
                    '<label>Leg Instructions</label>' +
                    '<input type="text" name="instructions" required>' +
                '</div>' +
            '</div>' +
        '</div>';

        wrapper.append(html);
        customSelectBox();
        });

        $("#remove-to-job").on("click", function(){
            var wrapper = $(".add-apply-wrapper");
            var count = wrapper.data("count");
            if(count>=2) {
                var newCount = count-1;
                wrapper.data("count", newCount);
            }    
            wrapper.find(".manage-apply").each(function( index ) {
                if ((index+1) == wrapper.find(".manage-apply").length) {
                    $(this).remove();
                }
            });
        });
    }
    
    function subMenu(){
        $('.info-user.has-children-menu').click( function(e) {
            e.preventDefault();

            $(this).toggleClass('active');
        });
    }
    function addsubMenu(){
        if( $(window).width() > 1200 ){
            $('.item.has-children-menu').click( function(e) {
                e.preventDefault();
    
                $(this).toggleClass('active');
            });
        }else{
            $('.item.has-children-menu').click( function(e) {
                e.preventDefault();
    
                $(this).find('.sub-menu').slideToggle();
            });
        }
        
    }

    
    
    })( jQuery );