(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),o=t(3),u=t(2),a=t(0),i=function(e){return Object(a.jsxs)("form",{onSubmit:e.addPerson,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:e.newName,onChange:e.handlePersonChange})]}),Object(a.jsxs)("div",{children:["number:"," ",Object(a.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){return Object(a.jsx)("form",{children:Object(a.jsxs)("div",{children:["filter shown with"," ",Object(a.jsx)("input",{value:e.newFilter,onChange:e.handleFilterChange})]})})},l=function(e){return Object(a.jsx)("div",{children:e.peopleToShow.map((function(n){return Object(a.jsxs)("div",{children:[n.name," ",n.number," ",Object(a.jsx)("button",{onClick:function(){return e.removePerson(n.id)},children:"delete"})]},n.id)}))})},d=t(4),j=t.n(d),b="/api/persons",h=function(){return j.a.get(b).then((function(e){return e.data}))},f=function(e){return j.a.post(b,e).then((function(e){return e.data}))},O=function(e){return j.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},m=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),d=Object(o.a)(r,2),j=d[0],b=d[1],m=Object(u.useState)(""),v=Object(o.a)(m,2),x=v[0],p=v[1],g=Object(u.useState)(""),w=Object(o.a)(g,2),C=w[0],N=w[1],S=Object(u.useState)(null),P=Object(o.a)(S,2),k=P[0],T=P[1],y=Object(u.useState)(null),F=Object(o.a)(y,2),D=F[0],E=F[1];Object(u.useEffect)((function(){h().then((function(e){c(e)}))}),[]),console.log("render",t.length,"persons");var J=function(e){var n=e.message;return null===n?null:Object(a.jsx)("div",{className:"error",children:n})},L=function(e){var n=e.message;return null===n?null:Object(a.jsx)("div",{className:"confirmation",children:n})},A=t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(L,{message:k}),Object(a.jsx)(J,{message:D}),Object(a.jsx)(s,{newFilter:C,handleFilterChange:function(e){N(e.target.value)}}),Object(a.jsx)("h2",{children:"Add new"}),Object(a.jsx)(i,{addPerson:function(e){e.preventDefault();var n=t.map((function(e){return e.name})),r={name:j,number:x};n.includes(j)?(E("".concat(j," is already added to phonebook")),setTimeout((function(){E(null)}),5e3)):(c(t.concat(r)),b(""),p(""),f(r).then((function(e){c(t.concat(e))})),T("".concat(j," added")),setTimeout((function(){T(null)}),5e3))},handleNumberChange:function(e){p(e.target.value)},handlePersonChange:function(e){console.log(e.target.value),b(e.target.value)},newName:j,newNumber:x}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(l,{peopleToShow:A,removePerson:function(e){window.confirm("Do you want to delete this person?")&&(O(e),T("Person deleted."),setTimeout((function(){T(null)}),5e3))}})]})};t(40);r.a.render(Object(a.jsx)(m,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.2394a0e8.chunk.js.map