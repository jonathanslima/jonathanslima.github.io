(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{16:function(e,o,a){(function(e){(()=>{const o={checkDataSave(){const o=JSON.parse(localStorage.getItem("dogSaved"));o&&(e("#containerImage").removeClass("no-image"),e("#nameDog").css("color",o.color),e("#nameDog").css("fontFamily",o.font),e("#imgDog").attr("src",o.img),e(".name span").text(o.name))},mountComboRaces(){fetch("https://dog.ceo/api/breeds/list/all").then(e=>e.json()).then(o=>{if("success"===o.status){let a=0;for(const t in o.message)Object.values(o.message)[a].length>0?Object.values(o.message)[a].map(o=>{e("#comboBoxRace").append(`<option value='${o}-${t}'>${o} ${t}</option>`)}):e("#comboBoxRace").append(`<option values='${t}'>${t}</option>`),a++;this.checkDataSave()}else alert("Something goes wrong! Try again!")}).catch(e=>alert("Something goes wrong! Try again later"))},callDog(){const o=e("#comboBoxRace").val().split("-");let a;e(".header .spinner-border").removeClass("d-none"),e("#containerImage").removeClass("no-image"),a=o.length<=1?`https://dog.ceo/api/breed/${o[0]}/images/random`:`https://dog.ceo/api/breed/${o[1]}/${o[0]}/images/random`,fetch(a).then(e=>e.json()).then(o=>{sessionStorage.setItem("img",o.message),"success"===o.status&&e("#imgDog").attr("src",o.message)}).then(()=>{e(".header .spinner-border").addClass("d-none")}).catch(()=>alert("Sorry! This dog has no image :("))},callColor(){const o=e("#comboBoxColor").val(),a={"Shocking Pink Crayola":"#FB62F6","State Blue":"#645DD7","Persian Green":"#2A9D8F",Jonquil:"#F9C80E","Tart Orange":"#FF4242"};e("#nameDog").css("color",a[o]),sessionStorage.setItem("color",a[o])},callFont(){const o=e("#comboBoxFont").val(),a={"Architects Daughter":"Architects Daughter, cursive","Noto Serif":"Noto Serif, serif",Oswald:"Oswald, sans-serif",Roboto:"Roboto, sans-serif",Ubuntu:"Ubuntu, sans-serif"};e("#nameDog").css("fontFamily",a[o]),sessionStorage.setItem("font",a[o])},calcData(){const e=new Date,o=e.getDay()<10?"0"+e.getDay():e.getDay();let a=e.getMonth()+1;a=a<10?"0"+a:a;return`${o}/${a}/${e.getFullYear()}`},calcHour(){const e=new Date;return`${e.getHours()<10?"0"+e.getHours():e.getHours()}:${e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes()}`},saveDog(){const a=sessionStorage.getItem("color"),t=sessionStorage.getItem("font"),s=sessionStorage.getItem("img"),n=sessionStorage.getItem("name"),c=`${o.calcData()} às ${o.calcHour()}`;e(".spinner-border").removeClass("d-none"),setTimeout(()=>{a&&t&&s&&n?(localStorage.setItem("dogSaved",JSON.stringify({name:n,color:a,font:t,img:s,date:c})),alert("Seu Doguinho foi salvo!")):alert("Você precisa escolher a raça, a cor, a fonte e digitar o nome antes de salvar"),e(".spinner-border").addClass("d-none")},1e3)},showInputName(o){o.hide(),e(".input-name-dog").fadeIn(),e(".input-name-dog").addClass("d-flex")},closeDogName(o){e(".text-warning").fadeOut(),o.closest("div").removeClass("d-flex"),o.closest("div").hide(),e(".name").fadeIn()},saveDogName(o){const a=e(".input-name-dog input").val();a.length?(e(".text-warning").fadeOut(),e(".name span").html(a),o.closest("div").removeClass("d-flex"),o.closest("div").hide(),e(".name").fadeIn(),sessionStorage.setItem("name",a)):e(".text-warning").show()}};e("#comboBoxRace").on("change",(function(){o.callDog()})),e("#comboBoxColor").on("change",(function(){o.callColor()})),e("#comboBoxFont").on("change",(function(){o.callFont()})),e(".name").on("click",(function(){o.showInputName(e(this))})),e("#nameDog").on("click","#close",(function(){o.closeDogName(e(this))})),e("#nameDog").on("click","#saveName",(function(){o.saveDogName(e(this))})),e("#save").on("click",(function(){o.saveDog()})),o.mountComboRaces()})()}).call(this,a(1))}},[[16,0,1]]]);