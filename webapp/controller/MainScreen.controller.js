sap.ui.define([
	"fiori/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"fiori/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/resource/ResourceModel"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, ResourceModel) {
	"use strict";

	return BaseController.extend("fiori.controller.MainScreen", {
		formatter: formatter,
		onInit: function () {
			debugger;
			var oTab = this.byId('table1');
			var oJSon = new JSONModel("model/modelData.json");
			oTab.setModel(oJSon);

			/*var aData = [{
				"name": "Tim",
				"email": "Tim.Dexter@gmail.com",
				"place": 'GKP',
				"salary": 90000

			}, {
				"name": "Tim",
				"email": "Mac.Dexter@gmail.com",
				"place": 'CNB',
				"salary": 98000
			}, {
				"name": "Kim",
				"email": "Kim.Dexter@gmail.com",
				"place": 'CNB',
				"salary": 111111
			}, {
				"name": "Tim",
				"email": "Ram.kumar@gmail.com",
				"place": 'LKO',
				"salary": 110000
			}]*/
			;
			// local data >jsonmodel > Control(table)
			/*			oJSon.setData({
							'modelData': aData
						});*/

			var oCmb = this.byId('box0');
			/*var aDatac = [{
				"key": "TPA",
				"place": "Tampa"
			}, {
				"key": "NDLS",
				"place": "Delhi",
			}];
			// local data >jsonmodel > Control(table)
			oJSonc.setData({
				'comboData': aDatac
			});*/
			var oJSonc = new JSONModel("model/city.json");
			oCmb.setModel(oJSonc);
			//Initialize the view Model data
			this.initViewModel();

		},
		handleDate: function () {
			var startDate = this.getView().byId("DTI1").getDateValue();
			var endDate = this.getView().byId("DTI2").getDateValue();
			var diff = Math.abs(startDate.getTime() - endDate.getTime());
			var diffD = Math.ceil(diff / (1000 * 60 * 60 * 24));
			debugger;
			this.byId('Text1').setText(diffD);
		},
		handleNext: function () {
			// to interact between view	using manifest data	- need to add these parameters in manifest	
			//			var fname = this.byId("namem").getValue();
			//			var femail = this.byId("emailm").getValue();

			//			this.getRouter().navTo("DetailScreen", {
			//				"namep": fname,
			//				"emailp": femail
			//			});

			// to interact between view	using model - no need to pass value in manifest			
			var adata = {};
			//capture the values from input field using Id
			//	adata.name = this.byId('namem').getValue();
			//	adata.email = this.byId('emailm').getValue();
			//capture the values from input field using model
			adata.email = this.getView().getModel('mainviewInput').getData().email;
			adata.name = this.getView().getModel('mainviewInput').getData().name;
			//since here we have to interact between views - hence sap.ui.core
			debugger;
			sap.ui.getCore().setModel(adata);
			this.getRouter().navTo("DetailScreen");
		},
		handleAdd: function (oEvent) {
			debugger;
			var oTab = this.byId('table1');
			debugger;
			// modelData is JsonModel data name given .
			oTab.getModel().oData.modelData.push({
				//    	"name": this.byId('namem').getValue(),
				"name": this.getView().getModel('mainviewInput').getData().name,
				//		"email": this.byId('emailm').getValue(),
				"email": this.getView().getModel('mainviewInput').getData().email,
				"place": this.byId('box0').getValue()
			});
			oTab.getModel().refresh("true");
		},
		handleCombo: function (oEvent) {
			var oTab = this.byId('box0');
			var inp = this.byId('iplace').getValue();
			debugger;
			// modelData is JsonModel data name given .
			oTab.getModel().oData.comboData.push({
				"place": inp,
			});
			oTab.getModel().refresh("true");
		},
		handleRowClick: function (oEvent1) {

			// to interact between view	using model - no need to pass value in manifest			
			var adata = {};
			//	//Read the value from the clicked row
			var fname = oEvent1.getSource().getCells()[0].getText();
			var email = oEvent1.getSource().getCells()[1].getText();

			//capture the values from input field
			adata.name = fname;
			adata.email = email;

			//since here we have to interact between views - hence sap.ui.core
			debugger;
			sap.ui.getCore().setModel(adata);
			this.getRouter().navTo("DetailScreen");

			//Read the value from the clicked row
			//		var fname = oEvent1.getSource().getCells()[0].getText();
			//		var email = oEvent1.getSource().getCells()[1].getText();
			//navigate to next screen with values from clicked row	
			//		this.getRouter().navTo("DetailScreen", {
			//			"namep": fname,
			//			"emailp": email

		},                                                                                                       
		initViewModel: function () {
			var mainviewmodel = new JSONModel();
			mainviewmodel.setData({
				"name": "Ram",
				"email": "RamEmail"
			});
			this.getView().setModel(mainviewmodel, 'mainviewInput');
		},
		getViewProperty: function (value) {
			var oModel = this.getView().getModel('mainviewInput');
			var name;
			name = oModel.getProperty(value);
			return name;

		},
		setViewProperty: function (name, value) {
			var oModel = this.getView().getModel('mainviewInput');
			oModel.setProperty(name, value);
		},

		handlePopulate: function () {

			var table1 = this.getView().byId("table1");
			var oitems = table1.getSelectedItems();
			for (var i = 0; i < table1.getSelectedItems().length; i++) {

				var oTab = this.byId('table2');
				var columnListItemNewLine = new sap.m.ColumnListItem({
					//Adding rows to the table from input fields
					type: "Navigation", //this will make the row active
					press: [this.handleRowClick, this], //this will trigger the function handleRowClick on press
					cells: [
						new sap.m.Text({
							text: oitems[i].getCells()[0].getText(),
						}),
						new sap.m.Text({
							text: oitems[i].getCells()[1].getText(),
						})
					]
				});
				//	oTab.removeAllItems();  - this can be used to refresh the table on eachclick
				oTab.addItem(columnListItemNewLine);
			}
		}
	});
});


