import'./scss/custom.scss';
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './scss/style.scss';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
$(document).ready(function () {
    $(function () {
        $("body").tooltip({ selector: '[data-toggle=tooltip]', placement: 'bottom' });

        $('.add-to-cart-btn').click(function () {
            alert('اضيف المنتج الى عربة الشراء');
        });
        $('#copyright').text("جميع الحقوق محفوظة للمتجر لسنة" + new Date().getFullYear());
        $('.product-option input[type="radio"]').change(function () {
            $(this).parents('.product-option').siblings().removeClass('active');
            $(this).parents('.product-option').addClass('active');
        });
        $('[data-product-quantity]').on('change', function () {

            //اجلب الكمية الجديدة
            var newQuantity = $(this).val();

            //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
            var parent = $(this).parents('[data-product-info]');

            //اجلب سعر القطعة الواحدة من معلومات المنتج
            var pricePerUnit = parent.attr('data-product-price');

            //السعر الإجمالي للمنتج هو سعر القطعة مضروبا بعددها
            var totalPriceForProduct = newQuantity * pricePerUnit;

            //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذاالسطر
            parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
            calculateTotelPrice();
        });
        $('[data-remove-from-cart]').click(function () {
            $(this).parents('[data-product-info]').remove();
            calculateTotelPrice();
        });
        function calculateTotelPrice() {
            var totalPriceForAllProducts = 0;
            $('[data-product-info]').each(function () {
                var pricePerUnit = $(this).attr('data-product-price');
                var quantity = $(this).find('[data-product-quantity]').val();
                var totalPriceForProduct = pricePerUnit * quantity;
                totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
            });
            $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');

        }
        var citiesByCountry = {
            sa: ['الرياض', 'جدة'],
            eg: ['القاهرة', 'الاسكندرية'],
            jo: ['عمان', 'الزرقاء'],
            sy: ['دمشق', 'حلب']
        };
        $('#form-checkout select[name="country"]').on("change", function () {

            var country = $(this).val();

            // اجلب مدن هذا البلد من المصفوفة
            var cities = citiesByCountry[country];


            $('#form-checkout select[name="city"]').empty();
            $('#form-checkout select[name="city"]').append(
                '<option disabled selected value="">اختر المدينة</option>'
            );


            cities.forEach(function (city) {
                var newOption = $('<option></option>');
                newOption.text(city);
                newOption.val(city);
                $('#form-checkout select[name="city"]').append(newOption);
            });
        });
        $('#form-checkout input[name="payment_methode"]').on("change", function () {
            var paymentMethod = $(this).val();

            if (paymentMethod === 'on_delivary') {
                $('#credit-card-info input').prop('disabled', true);
            }
            else {
                $('#credit-card-info input').prop('disabled ', false);
            }
            $('#credit-card-info').toggle();
        });

    });
    $(function () {
        $("#price-range").slider({
            range: true,
            min: 500,
            max: 1000,
            step:50,
            values: [250, 800],
            slide: function (event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);


            }
        });
        
    });
});