$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.finance-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        var $supplierBudgetMessageContainer = $divCont.find('.supplier-budget-message-container');
        
        $resultTr.each(function(index){
            var $supplierPriceCont = $(this).find('td:eq(7)');
            var supplierPrice = $supplierPriceCont.text();
            var $budgetQtyCont = $(this).find('td:eq(6)');
            var budgetQty = $budgetQtyCont.text();
            var cancelledPoStatus = $(this).find('td:eq(14)').text();
            var poStatus = $(this).find('td:eq(9)').text();
            var $poBtn = $(this).find('[data-name="Edit Purchase Order"]');
            var $cancelledPoBtn = $(this).find('[data-name="View Purchase Order"]');
            var $parentTr = $(this).closest('tr');
            
            if (supplierPrice == 'R0.00' || budgetQty === '0') {   
                $supplierBudgetMessageContainer.removeClass('d-none');

                if (supplierPrice == 'R0.00') {
                    highlightCell($supplierPriceCont);
                }

                if (budgetQty === '0') {
                    highlightCell($budgetQtyCont);
                }     
                
            }
            
            if (poStatus === 'No') {
                $poBtn.attr('disabled', 'disabled');
                $poBtn.addClass("disabled");
            }  
            
            if (cancelledPoStatus === 'Yes') {
                $cancelledPoBtn.removeClass('d-none');
                $poBtn.addClass('d-none');
            } else {
                $poBtn.removeClass('d-none');
                $cancelledPoBtn.addClass('d-none');
            }

        });

        function highlightCell(element) {
            element.addClass('bg-lighter-red');
        }

    });

});