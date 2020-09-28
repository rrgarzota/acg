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
            var $poBtn = $(this).find('[data-name="Add Purchase Order"]');
            var poSupplierID = $(this).find('td:eq(11)').text();
            var supplierIDAuth = $(this).find('td:eq(15)').text();
            var pricelistExisting = $(this).find('td:eq(16)').text();
            var pricelistItemExisting = $(this).find('td:eq(14)').text();
            var $pricelistBtn = $(this).find('[data-name="Add Pricelist"]');
            var $pricelistItemBtn = $(this).find('[data-name="Add Pricelist Item"]');
            var $editPricelistItemBtn = $(this).find('[data-name="Edit Pricelist Item"]');
            var $parentTr = $(this).closest('tr');

            if (supplierPrice == '£0.00' || budgetQty === 0 || (poSupplierID.trim() != supplierIDAuth.trim()) || poStatus.trim() === 'No' ) {
                $poBtn.attr('disabled', 'disabled');
                $poBtn.addClass("disabled");
            }            

            // show/hide of add/edit pricelist button
            if (pricelistExisting.trim().length == 0) {
                $pricelistBtn.removeClass('d-none');
            } else {
                $pricelistBtn.addClass('d-none');

                if (pricelistItemExisting.trim().length == 0) {
                    $pricelistItemBtn.removeClass('d-none');
                } else {
                    $pricelistItemBtn.addClass('d-none');
                    $editPricelistItemBtn.removeClass('d-none');
                    
                }
            }

            // highlight cell and show message
            if (supplierPrice == '£0.00' || budgetQty === '0') {      
                $supplierBudgetMessageContainer.removeClass('d-none');

                if (supplierPrice == '£0.00') {
                    highlightCell($supplierPriceCont);
                }

                if (budgetQty === '0') {
                    highlightCell($budgetQtyCont);
                }
            }

            if (poSupplierID.trim() != supplierIDAuth.trim() && poStatus === 'Yes') {
                highlightCell($poStatusCont);
                $poMessageContainer.removeClass('d-none');
                
            }

            

        });

        function highlightCell(element) {
            element.addClass('bg-lighter-red');
        }

    });

});