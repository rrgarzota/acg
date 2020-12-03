$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.supplier-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        var $supplierBudgetMessageContainer = $divCont.find('.supplier-budget-message-container');
        var $poMessageContainer = $divCont.find('.po-message-container');

        $resultTr.each(function(index){
            var $supplierPriceCont = $(this).find('td:eq(7)');
            var supplierPrice = $supplierPriceCont.text();
            var $budgetQtyCont = $(this).find('td:eq(6)');
            var budgetQty = $budgetQtyCont.text();
            var $poStatusCont = $(this).find('td:eq(9)');
            var poStatus = $poStatusCont.text();
            var cancelledPoStatus = $(this).find('td:eq(18)').text();

            var $viewPrBtn = $(this).find('.view');
            var $cancelledPrBtn = $(this).find('.cancelled');

            var poSupplierID = $(this).find('td:eq(11)').text();
            var supplierIDAuth = $(this).find('td:eq(15)').text();
            var pricelistItemExisting = $(this).find('td:eq(16)').text();
            var $addpricelistItemBtn = $(this).find('.bsi-add-pricelist-item');
            var $editPricelistItemBtn = $(this).find('.bsi-edit-pricelist-item');

            var $parentTr = $(this).closest('tr');

            if (supplierPrice == 'R0.00' || budgetQty === 0 || (poSupplierID.trim() != supplierIDAuth.trim()) || poStatus.trim() === 'No' ) {
                $viewPrBtn.attr('disabled', 'disabled');
                $viewPrBtn.addClass("disabled");
                $cancelledPrBtn.addClass('disabled');
                $cancelledPrBtn.attr('disabled', 'disabled');
            }            

            // show/hide of add/edit pricelist item button

            if (pricelistItemExisting.trim().length == 0) {
                $addpricelistItemBtn.removeClass('d-none');
            } else {
                $addpricelistItemBtn.addClass('d-none');
                $editPricelistItemBtn.removeClass('d-none');
                
            }

            // highlight cell and show message
            if (supplierPrice == 'R0.00' || budgetQty === '0') {      
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
                $addpricelistItemBtn.addClass('d-none');
                $editPricelistItemBtn.addClass('d-none');
            }

            if (poSupplierID.trim() != supplierIDAuth.trim() && poStatus === 'Yes') {
                highlightCell($poStatusCont);
                $poMessageContainer.removeClass('d-none');
                // hide supplier price when pr is submitted
                if (poStatus === 'Yes') {
                    $supplierPriceCont.text('');
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