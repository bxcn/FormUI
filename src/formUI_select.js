 $('[data-select]').each(function() {
   var html = $(this).html().replace(/(option)/gi, "li");
   console.log(html);
   $(this).wrap(function() {
     return `
        <div class="formUI_select">
          <div class="formUI_slected_name">请选择</div>
          <ul class="formUI_select_list">${html} </ul>
        </div>
      `;
   });
 })

 $(document).on("mouseover.bs.select", '.formUI_select', function() {
     var that = $(this);
     that.find('.formUI_select_list').show();
   })
   .on("mouseout.bs.select", '.formUI_select', function() {
     var that = $(this);
     that.find('.formUI_select_list').hide();
   })
   .on("click.bs.select", '.formUI_select li', function() {
     var that = $(this);
     var selectName = that.closest('.formUI_select').find('.formUI_slected_name');
     selectName.text(that.text());
     that.parent().hide();
   });