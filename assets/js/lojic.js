$(document).ready(function (){
   var toLocation = "to right";
   var selectedColors = [];

   radioButtonControl('#radio1','#radio2','#radio3','#radio4',true);

   function radioButtonControl(r1,r2,r3,r4,trueOrFalse){
      var txtColor = {color:'gray'};

      if (trueOrFalse === true){
         $(r1).prop('disabled',trueOrFalse);
         $(r2).prop('disabled',trueOrFalse);
         $(r3).prop('disabled',trueOrFalse);
         $(r4).prop('disabled',trueOrFalse);

      }else {
         $(r1).prop('disabled',trueOrFalse);
         $(r2).prop('disabled',trueOrFalse);
         $(r3).prop('disabled',trueOrFalse);
         $(r4).prop('disabled',trueOrFalse);
      }
   }

   function applyGradient() {
      if (selectedColors.length === 2) {
         const color1 = selectedColors[0];
         const color2 = selectedColors[1];
         $('#selectGradientColor').css('background', `linear-gradient(${toLocation}, ${color1}, ${color2})`);
         $('.sub1').removeClass('selected');
         selectedColors = [];
      }
   }

   // Event listener for the gradient radio button
   $('#gradiant').on('click', function () {
      radioButtonControl('#radio1','#radio2','#radio3','#radio4',false);
      $('#radio1').on('click', () => {
         toLocation = "to right";
      });

      $('#radio2').on('click', () => {
         toLocation = "to left";
      });

      $('#radio3').on('click', () => {
         toLocation = "to top";
      });

      $('#radio4').on('click', () => {
         toLocation = "to bottom";
      });

      // Unbind previous click events
      $('.sub1').off('click').on('click', function () {
         const color = $(this).css('background-color');
         const index = selectedColors.indexOf(color);

         if (index === -1) {  // if color is not already selected
            selectedColors.push(color);
            $(this).addClass('selected');
         } else {  // if color is already selected
            selectedColors.splice(index, 1);
            $(this).removeClass('selected');
         }
         applyGradient();
      });
   });

   // Event listener for the solid color radio button
   $('#solid').on('click', function () {
      radioButtonControl('#radio1','#radio2','#radio3','#radio4',true);
      // Remove any existing gradient
      $('#selectSolidColor').css('background', '');
      selectedColors = [];

      // Unbind previous click events and allow selection of a single solid color
      $('.sub1').off('click').on('click', function () {
         const selectedColor = $(this).css('background-color');
         $('#selectSolidColor').css('background-color', selectedColor);
         $('.sub1').removeClass('selected');
         $(this).addClass('selected');
         selectedColors = [selectedColor];
      });
   });

   $('#solid').trigger('click'); //default click
});