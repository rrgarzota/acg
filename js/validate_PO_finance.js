$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.finance-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        var $supplierBudgetMessageContainer = $divCont.find('.supplier-budget-message-container');
        
        $resultTr.each(function(index){
            var $supplierPriceCont = $(this).find('td:eq(8)');
            var supplierPrice = $supplierPriceCont.text();
            var $budgetQtyCont = $(this).find('td:eq(7)');
            var budgetQty = $budgetQtyCont.text();
            var cancelledPoStatus = $(this).find('td:eq(14)').text();
            var poStatus = $(this).find('td:eq(10)').text();
            var $viewPrBtn = $(this).find('.view');
            var $cancelledPrBtn = $(this).find('.cancelled');
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
                $viewPrBtn.attr('disabled', 'disabled');
                $viewPrBtn.addClass("disabled");
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