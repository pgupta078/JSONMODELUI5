/*global location*/
sap.ui.define([
	"fiori/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"fiori/model/formatter"
], function (
	BaseController,
	JSONModel,
	History,
	formatter
) {
	"use strict";
	return BaseController.extend("fiori.controller.DetailScreen", {

		formatter: formatter,

		onInit: function () {
			this.getRouter().getRoute("DetailScreen").attachPatternMatched(this._onObjectMatched, this);
		},
		
		handleNext:function()
		{
				this.getRouter().navTo("SubDetailScreen");
		},

		_onObjectMatched: function (oEvent) {
			//var fnm = oEvent.getParameter('arguments').namep;
			//var eml = oEvent.getParameter('arguments').emailp;
		//	this.byId('named').setText(fnm);
	//		this.byId('emaild').setText(eml);
	        debugger;
			var fnm  = sap.ui.getCore().getModel().name;
			var email = sap.ui.getCore().getModel().email;
			this.byId('named').setText(fnm);
			this.byId('emaild').setText(email);
		   	
			
			
			
		}
	});
});