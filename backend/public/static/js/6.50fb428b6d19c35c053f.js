webpackJsonp([6],{"9INL":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={data:function(){return{payload:{name:"",molarMass:0,density:0},title:"Criar elemento"}},components:{AsyncDialog:t("OvIy").a},methods:{open:function(e){return this.title=e&&""!==e?"Editar elemento":"Criar elemento",this.payload={name:"",molarMass:0,density:0},"string"==typeof e&&(this.payload.name=e),this.$refs.dialog.open()}}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("async-dialog",{ref:"dialog",attrs:{payload:e.payload,title:e.title}},[t("v-flex",{attrs:{xs12:"xs12"}},[t("v-text-field",{attrs:{light:"light",clearable:"clearable",label:"Nome do elemento"},model:{value:e.payload.name,callback:function(a){e.$set(e.payload,"name",a)},expression:"payload.name"}})],1),t("v-flex",{attrs:{xs12:"xs12"}},[t("v-text-field",{attrs:{light:"light",type:"number",label:"Massa molar (g/mol)"},model:{value:e.payload.molarMass,callback:function(a){e.$set(e.payload,"molarMass",a)},expression:"payload.molarMass"}})],1),t("v-flex",{attrs:{xs12:"xs12"}},[t("v-text-field",{attrs:{light:"light",type:"number",label:"Massa específica (g/cm³)"},model:{value:e.payload.density,callback:function(a){e.$set(e.payload,"density",a)},expression:"payload.density"}})],1)],1)},staticRenderFns:[]},o=t("VU/8")(l,s,!1,null,null,null);a.default=o.exports}});
//# sourceMappingURL=6.50fb428b6d19c35c053f.js.map