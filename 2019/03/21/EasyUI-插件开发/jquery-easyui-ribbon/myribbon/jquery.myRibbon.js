(function($){

	function buildTabs(target){
		var options = $.data(target,"ribbon").options;
		$(target).tabs(options);
	}

	function loadData(target,data){
		debugger;
		var r = $(target);
		var options = $.data(target,"ribbon").options;
		options.data = data;
		for (var i = 0; i < data.tabs.length; i++) {
			var tab = data.tabs[i];
			r.tabs("add",tab);
			var tabTarget = r.tabs("getTab",i);
			buildGroup(tab.groups,tabTarget);
		}
	}

	function buildGroup(groups,tabTarget){
		for (var i = 0; i < groups.length; i++) {
			var group = groups[i];
			var gt = $('<div class="ribbon-group"></div>').appendTo(tabTarget);
		  var tg = $('<div class="ribbon-toolbar"></div>').appendTo(gt);
			$('<div class="ribbon-title"></div>').html(group.title).appendTo(gt);
      buildToolBarRows(group.rows,tg);
		}
	}

  function buildToolBarRows(rows,toolbarTarget){
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var rowDiv = $('<div class="ribbon-row"></div>').appendTo(toolbarTarget);
      buildToolBarColumns(row.columns,rowDiv);
    }
  }

  function buildToolBarColumns(columns,rowTarget){
    debugger;
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      var type = col.type;
      var colDiv = $('<div class="ribbon-column"></div>').appendTo(rowTarget);
      if (type == "toolbar") {
        if (col.items) {
          buildTool(col.items,colDiv);
        }else{
          // $('')
        }
      }else{
        if (col.menuItems) {
          var m = $('<div></div>').appendTo('body');
          m.menu();
          $.each(col.menuItems,function(index,ele){
            m.menu("appendItem",ele);
          })
          col.menu = m;
        }
        var btn = $('<a href="javascript:void(0)"></a>').appendTo(colDiv);
        btn[type](col);

      }
    }
  }

  function buildTool(items,colTarget){
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var line = $('<li></li>').appendTo(colTarget);
      var btn = $('<a href="javascript:void(0)"></a>').appendTo(line);
      var type = item.type||'linkbutton';
      btn[type](item);
    }
  }

  	$.fn.ribbon = function(options,para){
  		debugger;
  		// if (typeof options == "string") {
  		// 	var method = $.fn.ribbon.methods[options];
  		// 	if (method) {
  		// 		return method(this,para);
  		// 	}else{

  		// 	}

  		// }
  		return this.each(function(){
  			var state = $.data(this,"ribbon");
  			if (state) {
  				$.extend(state.options,options);
  			}else{
  				state = $.data(this,"ribbon",{options:$.extend({},$.fn.ribbon.defaults,$.fn.ribbon.parseOptions(this),options)})
  			}
  			buildTabs(this);
  			if (state.options.data) {
  				loadData(this,state.options.data);
  			}
  			
  		})
  	}

  	$.fn.ribbon.methods = {
  		options:function(jq){
  			return $.data(jq[0],"ribbon").options;
  		}
  	}

  	$.fn.ribbon.parseOptions = function(target){
  		return $.extend({},$.fn.tabs.parseOptions(target),{});
  	}

  	$.fn.ribbon.defaults = $.extend({},$.fn.tabs.defaults);

	$.parser.plugins.push('ribbon');
})(jQuery);