$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.supplier-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 

        $resultTr.each(function(index){
            var supplierPrice = $(this).find('td:eq(7)').text();
            var budgetQty = $(this).find('td:eq(6)').text();
            var poStatus = $(this).find('td:eq(9)').text();
            var $poBtn = $(this).find('[data-name="Add Purchase Order"]');
            var poSupplierID = $(this).find('td:eq(11)').text();
            var supplierIDAuth = $(this).find('td:eq(15)').text();
            var pricelistExisting = $(this).find('td:eq(16)').text();
            var pricelistItemExisting = $(this).find('td:eq(14)').text();
            var $pricelistBtn = $(this).find('[data-name="Add Pricelist"]');
            var $pricelistItemBtn = $(this).find('[data-name="Add Pricelist Item"]');
            var $editPricelistItemBtn = $(this).find('[data-name="Edit Pricelist Item"]');
            // console.log($pricelistBtn);
            
            if (supplierPrice == '£0.00' || budgetQty === 0 || (poSupplierID.trim() != supplierIDAuth.trim() )) {
                $poBtn.attr('disabled', 'disabled');
            }

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

            

        });

    });

});