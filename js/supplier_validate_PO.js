$(function(){

    // chnage time zone here
    // moment.tz.setDefault("Africa/Harare"); //SAST time zone

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.supplier-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        var $supplierBudgetMessageContainer = $divCont.find('.supplier-budget-message-container');
        var $poMessageContainer = $divCont.find('.po-message-container');
        var dateToday = moment().utc().add(2, 'hour').format('YYYY-MM-DD');

        $resultTr.each(function(index){
            var $supplierPriceCont = $(this).find('td:eq(6)');
            var supplierPrice = $supplierPriceCont.text();
            var $budgetQtyCont = $(this).find('td:eq(5)');
            var budgetQty = $budgetQtyCont.text();
            var $budgetValueCont = $(this).find('td:eq(7)');
            var budgetValue = $budgetValueCont.text();
            var $poStatusCont = $(this).find('td:eq(8)');
            var poStatus = $poStatusCont.text();
            var cancelledPoStatus = $(this).find('td:eq(17)').text();

            var $viewPrBtn = $(this).find('.view');
            var $cancelledPrBtn = $(this).find('.cancelled');

            // var poSupplierID = $(this).find('td:eq(13)').text();
            var poSupplierID = $(this).find('td:eq(10)').text();
            var supplierIDAuth = $(this).find('td:eq(14)').text();
            var pricelistItemExisting = $(this).find('td:eq(15)').text();
            var $addpricelistItemBtn = $(this).find('.bsi-add-pricelist-item');
            var $editPricelistItemBtn = $(this).find('.bsi-edit-pricelist-item');

            var budgetValidDateValue = $(this).find('td:eq(20)').text();
            var newBudgetValidDateValue = moment(budgetValidDateValue, 'MM/DD/YYYY').format('YYYY-MM-DD');

            var $parentTr = $(this).closest('tr');
            // console.log(budgetValidDateValue);
            // console.log(newBudgetValidDateValue);
            // console.log('new');

            if (supplierPrice == 'R0.00' || budgetQty === 0 || (poSupplierID.trim() != supplierIDAuth.trim()) || poStatus.trim() === 'No' ) {
                $viewPrBtn.attr('disabled', 'disabled');
                $viewPrBtn.addClass("disabled");
                $cancelledPrBtn.addClass('disabled');
                $cancelledPrBtn.attr('disabled', 'disabled');
            }            

            // show/hide of add/edit pricelist item button

            // if (pricelistItemExisting.trim().length == 0) {
            //     $addpricelistItemBtn.removeClass('d-none');
            // } else {
            //     $addpricelistItemBtn.addClass('d-none');
            //     $editPricelistItemBtn.removeClass('d-none');
                
            // }

            // highlight cell and show message
            if ((supplierPrice == 'R0.00' && poStatus === 'No') || budgetQty === '0') {      
                $supplierBudgetMessageContainer.removeClass('d-none');

                if (supplierPrice == 'R0.00') {
                    highlightCell($supplierPriceCont);
                }

                if (budgetQty === '0') {
                    highlightCell($budgetQtyCont);
                }
            }

            // hide supplier price when pr is submitted
            if (poStatus === 'Yes') {
                $supplierPriceCont.text('');
                $budgetValueCont.text('');
                // $supplierPriceCont.removeClass('bg-lighter-red');
                $addpricelistItemBtn.addClass('d-none');
                $editPricelistItemBtn.addClass('d-none');
            } else {
                if (newBudgetValidDateValue == 'Invalid Date' || newBudgetValidDateValue < dateToday) {
                    $addpricelistItemBtn.addClass('d-none');
                    $editPricelistItemBtn.addClass('d-none');
                } else {
                    if (pricelistItemExisting.trim().length == 0) {
                        $addpricelistItemBtn.removeClass('d-none');
                    } else {
                        $addpricelistItemBtn.addClass('d-none');
                        $editPricelistItemBtn.removeClass('d-none');
                        
                    }
                }

            }

            if (poSupplierID.trim() != supplierIDAuth.trim() && poStatus === 'Yes') {
                highlightCell($poStatusCont);
                $poMessageContainer.removeClass('d-none');
                // hide supplier price when pr is submitted
                if (poStatus === 'Yes') {
                    $supplierPriceCont.text('');
                    $budgetValueCont.text('');
                    // $supplierPriceCont.removeClass('bg-lighter-red');
                    $addpricelistItemBtn.addClass('d-none');
                    $editPricelistItemBtn.addClass('d-none');
                }          
            }

            if (cancelledPoStatus === 'Yes') {
                $cancelledPrBtn.removeClass('d-none');
                $viewPrBtn.addClass('d-none');
            } else {
                $viewPrBtn.removeClass('d-none');
                $cancelledPrBtn.addClass('d-none');
            }

        });

        function highlightCell(element) {
            element.addClass('bg-lighter-red');
        }

    });

});