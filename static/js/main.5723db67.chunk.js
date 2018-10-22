(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var l=a(1),n=a.n(l),o=a(55),r=a.n(o),c=(a(66),a(56)),i=a(57),m=a(59),s=a(58),u=a(60),d=(a(68),a(70)),p=new d(new d.providers.HttpProvider("https://wallrpc.pirl.io")),h=p.fromWei(p.eth.getBalance("0x66502fB281a63015c80F25A0D3821c763F1Df700"),"ether")/1,E=Math.round(100*h)/100,v=p.fromWei(p.eth.getBalance("0xA32dA866506b40235B937A4f94E14708E74F1c83"),"ether")/1;console.log("Exact balance "+h),console.log("Rounded balance "+E);var b=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(m.a)(this,Object(s.a)(t).call(this))).updateContractNumber=function(t){e.setState({contractNumber:t.target.value}),console.log(t.target.value)},e.updateSomeNumber=function(t){e.setState({someNumber:t.target.value}),console.log(t.target.value)},e.updateSomeText=function(t){e.setState({someText:t.target.value}),console.log(t.target.value)},e.updatePirlWallet=function(t){e.setState({walletAddress:t.target.value}),e.setState({pirlUser:t.target.value}),"James"===e.state.pirlUser?e.wallet=v:e.wallet=h},e.updateSelection1=function(t){e.setState({selection1:t.target.value}),console.log(t.target.value)},e.updateSelection2=function(t){e.setState({selection2:t.target.value}),console.log(t.target.value)},e.state={pirlUser:"",wallet:"",walletAddress:"",contractNumber:"",someNumber:"",someText:"",selection1:"",selection2:""},e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"container"},n.a.createElement("h1",null,"Smart Contract Editor"),n.a.createElement("form",{id:"form_29559",className:"appnitro",method:"post",action:""},n.a.createElement("div",{className:"form_description"},n.a.createElement("h2",null,"Smart Contract Editor"),n.a.createElement("p",null,"Welcome to the Future")),n.a.createElement("ul",{className:"list"},n.a.createElement("li",{id:"li_1"},n.a.createElement("label",{className:"description"},"Select PIRL User"),n.a.createElement("div",null,n.a.createElement("select",{className:"wallet selection",id:"wallet",name:"walletOptions",value:this.state.walletAddress,onChange:this.updatePirlWallet},n.a.createElement("option",{value:""},"Select User"),n.a.createElement("option",{value:"James"},"James"),n.a.createElement("option",{value:"Nahom"},"Nahom")),n.a.createElement("span",{id:"PIRL"}," PIRL: ",this.wallet))),n.a.createElement("li",{id:"li_1"},n.a.createElement("label",{className:"description"},"Enter the contract number"),n.a.createElement("div",null,n.a.createElement("input",{placeholder:"Contract number",value:this.state.contractNumber,onChange:this.updateContractNumber,className:"contract",type:"text",maxLength:"255"}))),n.a.createElement("li",{className:"section_break"},n.a.createElement("h3",null,"Once the contract is entered, the user would press submit and see the content below based on the contract having an array, number, enum, and text"," "),n.a.createElement("p",null)),n.a.createElement("li",{id:"li_5"},n.a.createElement("label",{className:"description"},"Viewable Array Content - If content exists for the array value, populate the fields below"," "),n.a.createElement("div",null,n.a.createElement("select",{className:"element select medium",id:"element_5",name:"element_5",value:this.state.selection1,onChange:this.updateSelection1},n.a.createElement("option",{value:"1"},"Choose"),n.a.createElement("option",{value:"2"},"Computer Science"),n.a.createElement("option",{value:"3"},"IT"),n.a.createElement("option",{value:"4"},"IS")))),n.a.createElement("li",{id:"li_3"},n.a.createElement("label",{className:"description"},"Some number "),n.a.createElement("div",null,n.a.createElement("input",{id:"element_3",name:"element_3",className:"element text medium",type:"text",maxLength:"255",value:this.state.someNumber,onChange:this.updateSomeNumber}))),n.a.createElement("li",{id:"li_6"},n.a.createElement("label",{className:"description"},"Some Enum "),n.a.createElement("div",null,n.a.createElement("select",{className:"element select medium",id:"element_6",name:"element_6",value:this.state.selection2,onChange:this.updateSelection2},n.a.createElement("option",{value:"1"},"First option"),n.a.createElement("option",{value:"2"},"Second option"),n.a.createElement("option",{value:"3"},"Third option")))),n.a.createElement("li",{id:"li_4"},n.a.createElement("label",{className:"description"},"Some Text "),n.a.createElement("div",null,n.a.createElement("input",{id:"element_4",name:"element_4",className:"element text medium",type:"text",maxLength:"255",value:this.state.someText,onChange:this.updateSomeText}))),n.a.createElement("li",{className:"buttons"},n.a.createElement("input",{type:"hidden",name:"form_id",value:"29559"}),n.a.createElement("input",{id:"saveForm",className:"button_text",type:"submit",name:"submit",value:"Submit"})))))}}]),t}(l.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},61:function(e,t,a){e.exports=a(112)},66:function(e,t,a){},68:function(e,t,a){}},[[61,2,1]]]);
//# sourceMappingURL=main.5723db67.chunk.js.map